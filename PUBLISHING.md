# 发布指南 / Publishing Guide

## 自动发布（当前生效，推荐）

通过 GitHub Actions 在推送 `v*` tag 时自动发布到 npm，使用 **NPM_TOKEN** 认证（经典稳定方式）。

### 一次性配置

1. **npm token**：npmjs.com → 头像 → **Access Tokens** → 生成 **Granular Access Token**：
   - Packages and scopes：`All of my packages`（或仅 `dsh-vscode-theme`）
   - Permissions：**Read and write**
   - 2FA：勾选 **Bypass 2FA for publish**
2. **存入 GitHub**：仓库 **Settings → Secrets and variables → Actions → New repository secret**
   - Name：`NPM_TOKEN`
   - Value：上一步的 token
3. 工作流已就绪：`.github/workflows/publish.yml`

### 发布流程

```sh
# 1. 改版本号（例如 0.1.1 → 0.1.2）
#    手动编辑 package.json 的 version 字段，或：
npm version patch

# 2. 提交并打 tag 推送
git add package.json
git commit -m "chore: bump to 0.1.2"
git tag v0.1.2
git push origin main v0.1.2
```

GitHub Actions 自动运行 `npm publish`，几分钟内 npm 上出现新版本。

## 手动发布（临时应急）

```sh
cd dsh-vscode-theme
npm publish          # 使用本机 .npmrc 里的 token；2FA 账号会提示输验证码
```

## Trusted Publishing（OIDC）— 暂缓

npm 官方的 OIDC 免 token 方案，仓库侧工作流已尝试但**当前不可用**：
npm 存在未修复的上游 bug（[npm/cli#8730](https://github.com/npm/cli/issues/8730)、
[npm/cli#8976](https://github.com/npm/cli/issues/8976)），发布时 OIDC 签名成功但
PUT 返回 404。待 npm 修复后可切换（配置步骤见下文，切换时把
`.github/workflows/publish.yml` 换回文档示例即可）。

### 未来切换步骤（暂不需要）

1. npmjs.com → 包页面 → **Settings → Trusted Publisher** → GitHub Actions：
   - Organization or user：`lonebone`
   - Repository：`dsh-vscode-theme`
   - Workflow filename：`publish.yml`
   - Allowed actions：`npm publish`
2. 工作流改为官方文档配置（`id-token: write` + setup-node `registry-url` + `npm publish`）。
3. 删除 GitHub 上的 `NPM_TOKEN` secret。

## 版本号约定

- `package.json` 版本号与 tag 同步（`v` 前缀 tag 去掉前缀即版本号）。
- 发布后 npm 上 `latest` dist-tag 自动指向最新版。
