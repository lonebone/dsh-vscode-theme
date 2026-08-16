import { readFile, readdir, writeFile } from 'node:fs/promises';
import { isAbsolute, join } from 'node:path';
import { execFile, spawn } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

async function runGit(cwd, args) {
    try {
        const { stdout } = await execFileAsync('git', args, { cwd, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024, windowsHide: true });
        return { ok: true, stdout };
    } catch (err) {
        return { ok: false, stdout: err.stdout || '', stderr: err.stderr || String(err) };
    }
}

async function gitStatus(workspace) {
    const root = await runGit(workspace, ['rev-parse', '--show-toplevel']);
    if (!root.ok) return { repo: null, files: [], branch: null };
    const repo = root.stdout.trim();
    const br = await runGit(repo, ['rev-parse', '--abbrev-ref', 'HEAD']);
    let branch = br.ok && br.stdout.trim() !== 'HEAD' ? br.stdout.trim() : null;
    if (!branch) {
        const sha = await runGit(repo, ['rev-parse', '--short', 'HEAD']);
        branch = sha.ok ? 'HEAD @ ' + sha.stdout.trim() : 'detached';
    }
    const st = await runGit(repo, ['-c', 'core.quotepath=false', 'status', '--porcelain=v1']);
    const files = (st.stdout || '').split('\n').filter(Boolean).map((line) => {
        const code = line.slice(0, 2);
        let rest = line.slice(3);
        let path = rest.trim();
        if (code[0] === 'R' || code[1] === 'R') path = rest.split(' -> ')[1] || path;
        return { code, path, staged: code[0] !== ' ' && code[0] !== '?' };
    });
    const lg = await runGit(repo, ['-c', 'core.quotepath=false', 'log', '--pretty=%h%x09%s%x09%ar', '-10']);
    const commits = (lg.stdout || '').split('\n').filter(Boolean).map((l) => {
        const [hash, subject, when] = l.split('\t');
        return { hash: hash || '', subject: subject || '', when: when || '' };
    });
    return { repo, branch, files, commits };
}

async function gitDiff(repo, relpath, staged) {
    const args = ['-c', 'core.quotepath=false', 'diff'];
    if (staged) args.push('--cached');
    args.push('--unified=3', '--', relpath);
    const d = await runGit(repo, args);
    if (d.ok && d.stdout.trim() !== '') return { diff: d.stdout, kind: staged ? 'staged' : 'unstaged' };
    if (staged) return { diff: '', kind: 'none' };
    const tracked = await runGit(repo, ['ls-files', '--error-unmatch', '--', relpath]);
    if (!tracked.ok) {
        try {
            const content = await readFile(join(repo, relpath), 'utf8');
            const lines = content.split('\n');
            const diff = 'diff --git a/' + relpath + ' b/' + relpath + '\nnew file mode 100644\n--- /dev/null\n+++ b/' + relpath + '\n@@ -0,0 +1,' + lines.length + ' @@\n' + lines.map((l) => '+' + l).join('\n');
            return { diff, kind: 'untracked' };
        } catch (e) {
            return { diff: '', kind: 'error', error: e instanceof Error ? e.message : String(e) };
        }
    }
    return { diff: '', kind: 'none' };
}

// Files changed by one commit (lazy: only fetched when a commit is expanded).
// `git show --name-status` prints "STATUS\tpath" per file (renames as
// "R<score>\told\tnew" — we keep the new path).
async function gitCommitFiles(repo, hash) {
    if (!/^[0-9a-f]{4,40}$/i.test(hash || '')) return { ok: false, error: 'bad hash' };
    const r = await runGit(repo, ['-c', 'core.quotepath=false', 'show', '--format=', '--name-status', hash]);
    if (!r.ok) return { ok: false, error: r.stderr || 'git show failed' };
    const files = (r.stdout || '')
        .split('\n')
        .map((l) => l.trimEnd())
        .filter(Boolean)
        .map((l) => {
            const parts = l.split('\t');
            return { path: parts[parts.length - 1] || '', status: (parts[0] || 'M')[0] };
        })
        .filter((f) => f.path !== '');
    return { ok: true, files };
}

// Diff of a single file inside one commit.
async function gitCommitDiff(repo, hash, relpath) {
    const r = safeRel(relpath);
    if (r === null) return { ok: false, error: 'bad path' };
    if (!/^[0-9a-f]{4,40}$/i.test(hash || '')) return { ok: false, error: 'bad hash' };
    const d = await runGit(repo, ['-c', 'core.quotepath=false', 'show', '--unified=3', '--format=', hash, '--', r]);
    if (!d.ok) return { ok: false, error: d.stderr || 'git show failed' };
    return { ok: true, diff: d.stdout, kind: 'commit' };
}

// Guard a repo-relative path: reject absolute paths, drive letters, empty
// segments and any `..` traversal so a crafted query cannot escape the repo.
function safeRel(relpath) {
    if (relpath === '') return null;
    if (relpath.startsWith('/') || /^[a-zA-Z]:/.test(relpath)) return null;
    const parts = relpath.split(/[\\/]/);
    if (parts.some((s) => s === '..' || s === '')) return null;
    return relpath;
}

async function gitOp(repo, op, relpath, message) {
    switch (op) {
        case 'stage': {
            const r = safeRel(relpath);
            if (r === null) return { ok: false, error: 'bad path' };
            return await runGit(repo, ['add', '--', r]);
        }
        case 'unstage': {
            const r = safeRel(relpath);
            if (r === null) return { ok: false, error: 'bad path' };
            return await runGit(repo, ['restore', '--staged', '--', r]);
        }
        case 'discard': {
            const r = safeRel(relpath);
            if (r === null) return { ok: false, error: 'bad path' };
            const tracked = await runGit(repo, ['ls-files', '--error-unmatch', '--', r]);
            if (!tracked.ok) return await runGit(repo, ['clean', '-f', '--', r]);
            return await runGit(repo, ['restore', '--', r]);
        }
        case 'stageAll':
            return await runGit(repo, ['add', '-A']);
        case 'unstageAll':
            return await runGit(repo, ['reset', '-q']);
        case 'discardAll':
            return await runGit(repo, ['restore', '--staged', '--worktree', '.']);
        case 'init':
            return await runGit(repo, ['init', '-q']);
        case 'ignore': {
            const r = safeRel(relpath);
            if (r === null) return { ok: false, error: 'bad path' };
            try {
                const ignorePath = join(repo, '.gitignore');
                let content = '';
                try { content = await readFile(ignorePath, 'utf8'); } catch (e) { /* no .gitignore yet */ }
                const line = '/' + r.replace(/\\/g, '/');
                const has = content.split(/\r?\n/).some((l) => l.trim() === line);
                if (!has) {
                    const add = (content === '' || content.endsWith('\n')) ? '' : '\n';
                    await writeFile(ignorePath, content + add + line + '\n', 'utf8');
                }
                return { ok: true, stdout: '' };
            } catch (e) {
                return { ok: false, error: e instanceof Error ? e.message : String(e) };
            }
        }
        case 'commit': {
            const msg = (message || '').trim();
            if (!msg) return { ok: false, error: 'empty commit message' };
            if (msg.length > 10000) return { ok: false, error: 'commit message too long' };
            // With nothing staged, stage everything first — matches the common
            // expectation of "type a message and commit". With staged changes
            // present, commit only those (VS Code behavior).
            const st = await runGit(repo, ['-c', 'core.quotepath=false', 'status', '--porcelain=v1']);
            const hasStaged = (st.stdout || '').split('\n').some((l) => {
                const c = l.slice(0, 2);
                return c.length === 2 && c[0] !== ' ' && c[0] !== '?';
            });
            if (!hasStaged) {
                const add = await runGit(repo, ['add', '-A']);
                if (!add.ok) return add;
            }
            return await runGit(repo, ['commit', '-m', msg]);
        }
        default:
            return { ok: false, error: 'unknown op ' + op };
    }
}

function apply(ctx) {
    ctx.inject(["webServer"], (httpCtx) => {
        httpCtx.effect(() => httpCtx.webServer.register({
            kind: "prefix",
            path: "/vscode-fs",
            handler: async (req, res) => {
                const send = (code, body) => {
                    res.writeHead(code, { "content-type": "application/json; charset=utf-8", "cache-control": "no-cache" });
                    res.end(body);
                };
                try {
                    const url = new URL(req.url ?? "/", "http://x");
                    const p = url.searchParams.get("path") ?? "";
                    if (url.pathname === "/vscode-fs/list") {
                        if (!isAbsolute(p)) return send(400, JSON.stringify({ error: "absolute path required" }));
                        const dirents = await readdir(p, { withFileTypes: true });
                        const items = dirents
                            .map((e) => ({ name: e.name, type: e.isDirectory() ? "directory" : e.isFile() ? "file" : "other" }))
                            .sort((a, b) => a.type === b.type ? a.name.localeCompare(b.name) : (a.type === "directory" ? -1 : 1));
                        send(200, JSON.stringify({ path: p, items }));
                    } else if (url.pathname === "/vscode-fs/read") {
                        if (!isAbsolute(p)) return send(400, JSON.stringify({ error: "absolute path required" }));
                        const content = await readFile(p, "utf8");
                        send(200, JSON.stringify({ path: p, content }));
                    } else if (url.pathname === "/vscode-fs/reveal") {
                        if (!isAbsolute(p)) return send(400, JSON.stringify({ error: "absolute path required" }));
                        // Open the OS file manager with the path selected (Windows).
                        // explorer wants one "/select,<path>" argument with backslashes.
                        try {
                            const native = p.replace(/\//g, "\\");
                            spawn("explorer.exe", ["/select," + native], { detached: true, stdio: "ignore" }).unref();
                            send(200, JSON.stringify({ ok: true }));
                        } catch (err) {
                            send(500, JSON.stringify({ error: err instanceof Error ? err.message : String(err) }));
                        }
                    } else {
                        send(404, JSON.stringify({ error: "not found" }));
                    }
                } catch (err) {
                    send(500, JSON.stringify({ error: err instanceof Error ? err.message : String(err) }));
                }
            }
        }), "vscode-fs: file listing route");

        httpCtx.effect(() => httpCtx.webServer.register({
            kind: "prefix",
            path: "/vscode-git",
            handler: async (req, res) => {
                const send = (code, body) => {
                    res.writeHead(code, { "content-type": "application/json; charset=utf-8", "cache-control": "no-cache" });
                    res.end(body);
                };
                try {
                    const url = new URL(req.url ?? "/", "http://x");
                    const p = url.searchParams.get("path") ?? "";
                    const file = url.searchParams.get("file") ?? "";
                    const hash = url.searchParams.get("hash") ?? "";
                    if (url.pathname === "/vscode-git/status") {
                        if (!isAbsolute(p)) return send(400, JSON.stringify({ error: "absolute path required" }));
                        send(200, JSON.stringify(await gitStatus(p)));
                    } else if (url.pathname === "/vscode-git/diff") {
                        if (!isAbsolute(p) || file === "") return send(400, JSON.stringify({ error: "absolute repo path and file required" }));
                        const staged = url.searchParams.get("staged") === "1";
                        send(200, JSON.stringify(await gitDiff(p, file, staged)));
                    } else if (url.pathname === "/vscode-git/commit-files") {
                        if (!isAbsolute(p) || hash === "") return send(400, JSON.stringify({ error: "absolute repo path and hash required" }));
                        send(200, JSON.stringify(await gitCommitFiles(p, hash)));
                    } else if (url.pathname === "/vscode-git/commit-diff") {
                        if (!isAbsolute(p) || hash === "" || file === "") return send(400, JSON.stringify({ error: "absolute repo path, hash and file required" }));
                        send(200, JSON.stringify(await gitCommitDiff(p, hash, file)));
                    } else if (url.pathname === "/vscode-git/op") {
                        if (!isAbsolute(p)) return send(400, JSON.stringify({ error: "absolute repo path required" }));
                        const op = url.searchParams.get("op") ?? "";
                        const msg = url.searchParams.get("msg") ?? "";
                        const r = await gitOp(p, op, file, msg);
                        send(r.ok ? 200 : 500, JSON.stringify(r));
                    } else {
                        send(404, JSON.stringify({ error: "not found" }));
                    }
                } catch (err) {
                    send(500, JSON.stringify({ error: err instanceof Error ? err.message : String(err) }));
                }
            }
        }), "vscode-git: source control route");
    });
}

export { apply };
