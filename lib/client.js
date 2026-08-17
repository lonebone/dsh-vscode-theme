window.__ModuleLoader__.load({
	id: "dsh-vscode-shell",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		const React = require("react");
		const runtimeClient = require("@deepseek-ai/dsh-client-runtime/client");
		const defineStore = runtimeClient.defineStore;
		const primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		const ReadBlock = primitives.ReadBlock;

		// ---------- CSS ----------
		const CSS = ".vsc-frame{display:grid;grid-template-rows:100%;height:100%;width:100%;background:var(--dsw-alias-bg-base,#1e1e1e);overflow:hidden;position:relative}.vsc-activitybar{background:var(--dsw-specific-sidebar-fill,#252526);border-right:1px solid var(--dsw-alias-border-l1,#333);display:flex;flex-direction:column;align-items:center;padding-top:6px;gap:2px;min-width:0}.vsc-sidebar,.vsc-explorer,.vsc-scm{background:var(--dsw-specific-sidebar-fill,#252526);border-right:1px solid var(--dsw-alias-border-l1,#333);min-width:0;overflow:auto;height:100%}.vsc-editor{min-width:0;overflow:hidden;display:flex;flex-direction:column;background:var(--dsw-alias-bg-base,#1e1e1e)}.vsc-conversation{border-left:1px solid var(--dsw-alias-border-l2,#333);min-width:0;overflow:hidden;background:var(--dsw-alias-bg-base,#1e1e1e);display:flex;flex-direction:column}.vsc-conversation__body{flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column}.vsc-tabs{display:flex;align-items:stretch;flex:0 0 34px;border-bottom:1px solid var(--dsw-alias-border-l1,#333);overflow-x:auto;background:var(--dsw-alias-bg-base,#1e1e1e)}.vsc-tab{display:flex;align-items:center;gap:6px;padding:0 10px;cursor:pointer;font-family:system-ui,sans-serif;font-size:12px;color:var(--dsw-alias-text-secondary,#9d9d9d);white-space:nowrap;border-right:1px solid var(--dsw-alias-border-l1,#333);user-select:none}.vsc-tab:hover{color:var(--dsw-alias-text-primary,#fff)}.vsc-tab--active{color:var(--dsw-alias-text-primary,#fff);background:var(--dsw-alias-bg-base,#1e1e1e);box-shadow:inset 0 2px 0 var(--dsw-alias-accent,#007acc)}.vsc-tab__label{max-width:140px;overflow:hidden;text-overflow:ellipsis}.vsc-tab__close{background:none;border:none;color:inherit;cursor:pointer;font-size:14px;line-height:1;padding:0;border-radius:3px;width:16px;height:16px;display:flex;align-items:center;justify-content:center}.vsc-tab__close:hover{background:rgba(255,255,255,0.15)}.vsc-details{position:absolute;top:0;bottom:0;right:0;border-left:1px solid var(--dsw-alias-border-l2,#333);background:var(--dsw-alias-bg-base,#1e1e1e);z-index:30;overflow:hidden}.vsc-overlay{z-index:20;pointer-events:none;position:absolute;inset:0}.vsc-overlay>*{pointer-events:auto}.vsc-activitybar__item{width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:none;border:none;color:var(--dsw-alias-text-secondary,#9d9d9d);cursor:pointer;border-radius:6px;padding:0}.vsc-activitybar__item:hover{color:var(--dsw-alias-text-primary,#fff);background:rgba(255,255,255,0.07)}.vsc-activitybar__item--active{color:var(--dsw-alias-text-primary,#fff)}.vsc-icon{width:22px;height:22px;display:inline-flex}.vsc-icon svg{width:100%;height:100%}.vsc-editor-empty{flex:1;display:flex;align-items:center;justify-content:center;color:var(--dsw-alias-text-secondary,#888);font-family:system-ui,sans-serif;font-size:13px}.vsc-editor__header{padding:8px 12px;border-bottom:1px solid var(--dsw-alias-border-l1,#333);font-family:ui-monospace,monospace;font-size:12px;color:var(--dsw-alias-text-secondary,#9d9d9d);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:0 0 auto}.vsc-editor__content{flex:1;overflow:auto;margin:0;padding:12px 16px;font-family:ui-monospace,Consolas,monospace;font-size:13px;line-height:1.5;color:var(--dsw-alias-text-primary,#d4d4d4);white-space:pre}.vsc-editor__error{flex:1;padding:16px;color:#f48771;font-family:ui-monospace,monospace;font-size:12px}.vsc-explorer-empty,.vsc-scm-empty{display:flex;align-items:center;justify-content:center;height:100%;color:var(--dsw-alias-text-secondary,#888);font-family:system-ui,sans-serif;font-size:12px;padding:12px}.vsc-treenode{display:flex;align-items:center;height:22px;padding-right:8px;cursor:pointer;font-family:system-ui,sans-serif;font-size:13px;color:var(--dsw-alias-text-primary,#d4d4d4);white-space:nowrap;overflow:hidden;user-select:none}.vsc-treenode:hover{background:rgba(255,255,255,0.05)}.vsc-treenode--active{background:rgba(0,122,204,0.25)}.vsc-treenode__chevron{width:16px;flex:0 0 16px;text-align:center;color:var(--dsw-alias-text-secondary,#9d9d9d);font-size:10px}.vsc-treenode__name{overflow:hidden;text-overflow:ellipsis}.vsc-scm__file{display:flex;align-items:center;gap:8px;height:22px;padding:0 10px;cursor:pointer;font-family:system-ui,sans-serif;font-size:13px;color:var(--dsw-alias-text-primary,#d4d4d4);white-space:nowrap;overflow:hidden}.vsc-scm__file:hover{background:rgba(255,255,255,0.05)}.vsc-scm__file--active{background:rgba(0,122,204,0.25)}.vsc-scm__badge{flex:0 0 16px;text-align:center;font-size:11px;font-weight:700}.vsc-scm__badge--M{color:#e2c08d}.vsc-scm__badge--A{color:#89d185}.vsc-scm__badge--D{color:#f48771}.vsc-scm__badge--untracked{color:#89d185}.vsc-scm__name{overflow:hidden;text-overflow:ellipsis}.vsc-scm__header{padding:8px 10px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--dsw-alias-text-secondary,#9d9d9d);border-bottom:1px solid var(--dsw-alias-border-l1,#333)}.vsc-diff{flex:1;overflow:auto;margin:0;padding:0;font-family:ui-monospace,Consolas,monospace;font-size:12px;line-height:1.5}.vsc-diff__line{white-space:pre;padding:0 12px;min-height:18px}.vsc-diff__hdr{color:var(--dsw-alias-text-secondary,#9d9d9d)}.vsc-diff__hunk{color:#569cd6}.vsc-diff__add{background:rgba(53,160,76,0.18);color:#d4f0d4}.vsc-diff__del{background:rgba(240,80,70,0.18);color:#f8d0cc}.vsc-diff__ctx{color:var(--dsw-alias-text-primary,#d4d4d4)}.vsc-activitybar__spacer{flex:1}.vsc-enter-badge{font-size:13px;font-weight:700;line-height:1}.vsc-toast{position:fixed;bottom:18px;left:50%;transform:translateX(-50%);background:#007acc;color:#fff;padding:8px 14px;border-radius:6px;font-family:system-ui,sans-serif;font-size:12px;z-index:2147483647;box-shadow:0 4px 14px rgba(0,0,0,0.4);pointer-events:none;max-width:70vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.vsc-editor-readblock{flex:1;overflow:auto;font-family:ui-monospace,Consolas,monospace;font-size:13px;line-height:1.55;color:var(--dsw-alias-text-primary,#d4d4d4)}.vsc-editor-readblock>div:first-child{display:flex;justify-content:space-between;align-items:center;padding:6px 12px;border-bottom:1px solid var(--dsw-alias-border-l1,#333);font-family:system-ui,sans-serif;font-size:12px;color:var(--dsw-alias-text-secondary,#9d9d9d)}.vsc-editor-readblock>div:first-child>div:first-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.vsc-editor-readblock>div:first-child>div:last-child{display:flex;align-items:center;gap:10px;flex:0 0 auto}.vsc-editor-readblock>div:first-child button{background:none;border:1px solid var(--dsw-alias-border-l1,#333);color:var(--dsw-alias-text-secondary,#9d9d9d);border-radius:4px;padding:2px 8px;cursor:pointer;font-size:11px}.vsc-editor-readblock>div:first-child button:hover{color:var(--dsw-alias-text-primary,#fff)}.vsc-editor-readblock>div:nth-child(2)>div{display:flex;align-items:stretch}.vsc-editor-readblock>div:nth-child(2)>div>span:first-child{flex:0 0 52px;text-align:right;padding-right:14px;color:var(--dsw-alias-text-secondary,#6e7681);user-select:none;font-size:11px}.vsc-editor-readblock>div:nth-child(2)>div>span:last-child{flex:1;white-space:pre;padding-right:12px}";
		(function injectCss() {
			const tagId = "dsh-vscode-shell/frame.css";
			if (typeof document !== "undefined" && document.querySelector('style[data-plugin-css="' + tagId + '"]') === null) {
				const tag = document.createElement("style");
				tag.dataset.plugin = "dsh-vscode-shell";
				tag.dataset.pluginCss = tagId;
				tag.textContent = CSS;
				document.head.appendChild(tag);
			}
		})();

		// Extra styles for SCM actions / grouping and the sidebar resizer
		// (kept separate from the big CSS blob so it stays readable).
		const EXTRA_CSS = ".vsc-scm__header{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 10px;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--dsw-alias-label-secondary,#9d9d9d);border-bottom:1px solid var(--dsw-alias-border-l1,#333);position:sticky;top:0;background:var(--dsw-specific-sidebar-fill,#252526);z-index:1}.vsc-scm__branch{font-weight:600;color:var(--dsw-alias-label-primary,#ccc);text-transform:none;letter-spacing:0;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.vsc-scm__header-actions{display:flex;gap:2px;flex:0 0 auto}.vsc-scm__group-title{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--dsw-alias-label-secondary,#9d9d9d);padding:8px 10px 4px;font-weight:600}.vsc-scm__file{display:flex;align-items:center;gap:6px;padding:3px 8px;cursor:pointer;font-size:13px;color:var(--dsw-alias-label-primary,#ccc)}.vsc-scm__file:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(90,93,94,.31))}.vsc-scm__file--active{background:var(--dsw-alias-interactive-bg-hover,rgba(90,93,94,.31))}.vsc-scm__name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.vsc-scm__actions{display:none;gap:2px;flex:0 0 auto}.vsc-scm__file:hover .vsc-scm__actions{display:flex}.vsc-scm__act{background:none;border:none;color:var(--dsw-alias-label-secondary,#9d9d9d);cursor:pointer;font-size:12px;line-height:1;padding:2px 5px;border-radius:3px}.vsc-scm__act:hover{background:rgba(255,255,255,.15);color:var(--dsw-alias-label-primary,#fff)}.vsc-scm__act:disabled{opacity:.4;cursor:default}.vsc-scm-init{padding:14px 12px;display:flex;flex-direction:column;align-items:center;gap:10px}.vsc-scm-init__btn{background:var(--dsw-alias-brand-primary,#0e639c);color:#fff;border:none;border-radius:4px;padding:6px 16px;font-size:13px;cursor:pointer}.vsc-scm-init__btn:hover{filter:brightness(1.15)}.vsc-scm-init__btn:disabled{opacity:.5;cursor:default}.vsc-activitybar__item--active{color:var(--dsw-alias-text-primary,#fff);background:var(--dsw-alias-bg-base,#1e1e1e);box-shadow:inset 2px 0 0 var(--dsw-alias-accent,#007acc)}.vsc-treenode__actions{display:none;gap:2px;flex:0 0 auto;margin-left:auto;align-items:center}.vsc-treenode:hover .vsc-treenode__actions{display:flex}.vsc-treenode__act{background:none;border:none;color:var(--dsw-alias-text-secondary,#9d9d9d);cursor:pointer;width:18px;height:18px;display:flex;align-items:center;justify-content:center;border-radius:3px;padding:0}.vsc-treenode__act:hover{background:rgba(255,255,255,.15);color:var(--dsw-alias-text-primary,#fff)}.vsc-treenode__act .vsc-icon{display:flex}.vsc-treenode--multi{background:rgba(0,122,204,.14)}.vsc-conversation{position:relative}.vsc-jumpbar{position:absolute;top:34px;bottom:0;right:0;width:16px;z-index:5;pointer-events:none}.vsc-jumpbar__line{position:absolute;top:0;bottom:0;right:7px;width:1px;background:var(--dsw-alias-border-l1,#333)}.vsc-jumpbar__viewport{position:absolute;left:-1px;right:-1px;background:var(--dsw-alias-accent,#007acc);border-radius:2px;opacity:.5;transition:top .15s ease,height .15s ease}.vsc-jumpbar__dot{position:absolute;right:3px;width:9px;height:9px;border-radius:50%;background:var(--dsw-alias-label-secondary,#9d9d9d);cursor:pointer;pointer-events:auto;transform:translateY(-50%);transition:top .25s ease,transform .1s ease,background .1s ease}.vsc-jumpbar__dot:hover{background:var(--dsw-alias-accent,#007acc);transform:translateY(-50%) scale(1.25)}.vsc-jumpbar__dot--marked{background:#e2b93d}.vsc-jumpbar__star{position:absolute;right:-3px;top:-7px;font-size:11px;color:#e2b93d;background:var(--dsw-alias-bg-base,#1e1e1e);border:1px solid var(--dsw-alias-border-l1,#333);border-radius:50%;width:15px;height:15px;display:flex;align-items:center;justify-content:center}.vsc-scm__commit-input{display:block;width:calc(100% - 20px);margin:4px 10px 6px;background:var(--dsw-alias-bg-base,#1e1e1e);color:var(--dsw-alias-label-primary,#ccc);border:1px solid var(--dsw-alias-border-l1,#333);border-radius:4px;padding:6px 8px;font-size:13px;resize:vertical;font-family:inherit;box-sizing:border-box}.vsc-scm__commit-input:focus{outline:none;border-color:var(--dsw-alias-accent,#007acc)}.vsc-activitybar__footer{display:flex;flex-direction:column;align-items:center;gap:2px;padding-bottom:6px;margin-top:auto}.vsc-activitybar .vsc-activitybar{height:100%}.vsc-scm__act .vsc-icon svg{width:14px;height:14px;display:block}.vsc-treenode__act .vsc-icon svg{width:14px;height:14px;display:block}.vsc-tabs__spacer{flex:1}.vsc-tab-new{background:none;border:none;color:var(--dsw-alias-text-secondary,#9d9d9d);cursor:pointer;font-size:16px;line-height:1;padding:0 10px;flex:0 0 auto}.vsc-tab-new:hover{color:var(--dsw-alias-text-primary,#fff)}.vsc-treenode--active,.vsc-treenode--active:hover{background:rgba(0,122,204,.28);box-shadow:inset 2px 0 0 var(--dsw-alias-accent,#007acc)}.vsc-scm__file--active,.vsc-scm__file--active:hover{background:rgba(0,122,204,.28);box-shadow:inset 2px 0 0 var(--dsw-alias-accent,#007acc)}.vsc-scm{display:flex;flex-direction:column;overflow:hidden}.vsc-scm__split{flex:1;min-height:0;display:flex;flex-direction:column}.vsc-scm__changes{flex:0 0 auto;min-height:140px;overflow-y:auto;overflow-x:hidden}.vsc-scm__splitter{flex:0 0 5px;cursor:row-resize;background:transparent;z-index:2}.vsc-scm__splitter:hover,.vsc-scm__splitter--active{background:var(--dsw-alias-accent,#007acc);opacity:.5}.vsc-scm__commits{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;border-top:1px solid var(--dsw-alias-border-l1,#333);padding-bottom:8px}.vsc-scm__commit-row{display:flex;align-items:center;gap:6px;padding:3px 8px 3px 6px;font-size:12px;color:var(--dsw-alias-label-primary,#ccc);cursor:pointer;user-select:none}.vsc-scm__commit-row:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(90,93,94,.31))}.vsc-scm__commit-row--open{background:var(--dsw-alias-interactive-bg-hover,rgba(90,93,94,.31))}.vsc-scm__commit-chevron{flex:0 0 auto;width:12px;text-align:center;color:var(--dsw-alias-label-secondary,#9d9d9d);font-size:10px}.vsc-scm__commit-hash{color:var(--dsw-alias-accent,#007acc);font-family:monospace;flex:0 0 auto;font-size:11px}.vsc-scm__commit-subject{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.vsc-scm__commit-when{color:var(--dsw-alias-label-secondary,#9d9d9d);flex:0 0 auto;font-size:11px}.vsc-scm__commit-files{max-height:320px;overflow-y:auto}.vsc-scm__commit-file{display:flex;align-items:center;gap:6px;padding:2px 8px 2px 24px;cursor:pointer;font-size:12.5px;color:var(--dsw-alias-label-primary,#ccc)}.vsc-scm__commit-file:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(90,93,94,.31))}.vsc-scm__commit-file--active{background:rgba(0,122,204,.28);box-shadow:inset 2px 0 0 var(--dsw-alias-accent,#007acc)}.vsc-scm__commit-empty{color:var(--dsw-alias-label-tertiary,#858585);padding:2px 8px 2px 24px;font-size:12px}.vsc-scm__commit-file .vsc-scm__badge{font-size:10px}.vsc-jumpbar__tip{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:var(--dsw-alias-bg-overlay,#252526);border:1px solid var(--dsw-alias-border-l1,#333);border-radius:4px;padding:6px 8px;font-size:12px;color:var(--dsw-alias-label-primary,#ccc);width:280px;max-height:min(60vh,420px);z-index:10;pointer-events:auto;box-shadow:0 2px 10px rgba(0,0,0,.35)}.vsc-jumpbar__tip-text{white-space:pre-wrap;word-break:break-word;line-height:1.4;margin-bottom:5px;max-height:300px;overflow-y:auto;padding-right:24px}.vsc-jumpbar__tip-time{color:var(--dsw-alias-label-secondary,#9d9d9d);font-size:11px;text-align:right;padding-right:24px;margin-top:2px}.vsc-jumpbar__tip-star{position:absolute;top:4px;right:4px;background:none;border:none;color:var(--dsw-alias-label-secondary,#9d9d9d);cursor:pointer;font-size:16px;padding:2px;border-radius:3px;line-height:1}.vsc-jumpbar__tip-star:hover{color:var(--dsw-alias-accent,#007acc);transform:scale(1.15)}.vsc-jumpbar__tip-star.on{color:#e2b93d}.vsc-resizer{width:5px;cursor:col-resize;background:transparent;flex:0 0 5px}.vsc-resizer:hover{background:var(--dsw-alias-accent,#007acc);opacity:.4}";
		(function injectExtraCss() {
			const tagId = "dsh-vscode-shell/extra.css";
			if (typeof document !== "undefined" && document.querySelector('style[data-plugin-css="' + tagId + '"]') === null) {
				const tag = document.createElement("style");
				tag.dataset.plugin = "dsh-vscode-shell";
				tag.dataset.pluginCss = tagId;
				tag.textContent = EXTRA_CSS;
				document.head.appendChild(tag);
			}
		})();

		// Context-menu styles (VS Code-like dropdown, sits above every DSH overlay).
		const CTX_CSS = ".vsc-ctx{position:fixed;z-index:2147483000;min-width:200px;max-width:340px;padding:4px;background:var(--dsw-alias-bg-overlay,#252526);border:1px solid var(--dsw-alias-border-l2,#454545);border-radius:6px;box-shadow:0 6px 24px rgba(0,0,0,.45);font-family:system-ui,sans-serif;font-size:13px;color:var(--dsw-alias-label-primary,#ccc);user-select:none;line-height:1.4}.vsc-ctx__item{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:5px 10px;border-radius:4px;cursor:pointer;white-space:nowrap;color:var(--dsw-alias-label-primary,#ccc)}.vsc-ctx__item:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(90,93,94,.31));color:var(--dsw-alias-label-primary,#fff)}.vsc-ctx__item--danger:hover{background:rgba(196,43,28,.92);color:#fff}.vsc-ctx__item--disabled{opacity:.45;cursor:default}.vsc-ctx__item--disabled:hover{background:transparent;color:var(--dsw-alias-label-primary,#ccc)}.vsc-ctx__sep{height:1px;margin:4px 6px;background:var(--dsw-alias-border-l1,#333)}.vsc-ctx__hint{font-size:11px;color:var(--dsw-alias-label-tertiary,#858585)}";
		(function injectCtxCss() {
			const tagId = "dsh-vscode-shell/ctx.css";
			if (typeof document !== "undefined" && document.querySelector('style[data-plugin-css="' + tagId + '"]') === null) {
				const tag = document.createElement("style");
				tag.dataset.plugin = "dsh-vscode-shell";
				tag.dataset.pluginCss = tagId;
				tag.textContent = CTX_CSS;
				document.head.appendChild(tag);
			}
		})();

		// ---------- VS Code Dark+/Light+ token layer ----------
		// Adopted from the official ctx.theme.overrideTokens() API (as used by
		// Sim-xia/dsh-vscode-theme): instead of relying on the DSH default
		// palette + CSS fallbacks, we stack a VS Code workbench palette over
		// the active theme. Both palette modes are mandatory per token; the
		// theme service composes the layer into the snapshot and re-emits
		// theme/change, so our presenter below applies it like any theme.
		const VSCODE_TOKENS = {
			// surfaces
			"--dsw-alias-bg-base": { light: "#ffffff", dark: "#1e1e1e" },
			"--dsw-alias-bg-layer-1": { light: "#f3f3f3", dark: "#252526" },
			"--dsw-alias-bg-layer-2": { light: "#ececec", dark: "#2d2d2d" },
			"--dsw-alias-bg-layer-3": { light: "#ffffff", dark: "#1e1e1e" },
			"--dsw-alias-bg-overlay": { light: "#ffffff", dark: "#252526" },
			"--dsw-alias-bg-module-platform": { light: "#f3f3f3", dark: "#252526" },
			"--dsw-specific-sidebar-fill": { light: "#f3f3f3", dark: "#252526" },
			// borders
			"--dsw-alias-border-l1": { light: "#d4d4d4", dark: "#3c3c3c" },
			"--dsw-alias-border-l2": { light: "#c8c8c8", dark: "#454545" },
			// text
			"--dsw-alias-label-primary": { light: "#333333", dark: "#cccccc" },
			"--dsw-alias-label-secondary": { light: "#616161", dark: "#9d9d9d" },
			"--dsw-alias-label-tertiary": { light: "#858585", dark: "#858585" },
			"--dsw-alias-text-primary": { light: "#333333", dark: "#e8e8e8" },
			"--dsw-alias-text-secondary": { light: "#616161", dark: "#9d9d9d" },
			// brand / accent
			"--dsw-alias-brand-primary": { light: "#007acc", dark: "#0e639c" },
			"--dsw-alias-accent": { light: "#0066b8", dark: "#007acc" },
			"--dsw-alias-state-business-primary": { light: "#0090f1", dark: "#007fd4" },
			// interactive
			"--dsw-alias-interactive-bg-hover": { light: "#e8e8e8", dark: "#2a2d2e" },
			// status
			"--dsw-alias-state-error-primary": { light: "#a1260d", dark: "#f48771" },
			"--dsw-alias-state-success-primary": { light: "#587c0c", dark: "#73c991" },
			"--dsw-alias-state-warn-primary": { light: "#bf8803", dark: "#cca700" }
		};

		// ---------- ThemePresenter (mirrors ui-layout) ----------
		const DARK_ATTRIBUTE = "data-ds-dark-theme";
		class ThemePresenter {
			appliedTokens = [];
			themeColorMeta;
			constructor() {
				this.themeColorMeta = document.createElement("meta");
				this.themeColorMeta.name = "theme-color";
			}
			apply(snapshot) {
				const scheme = snapshot.active.colorScheme;
				document.documentElement.style.colorScheme = scheme;
				const body = document.body;
				if (scheme === "dark") body.setAttribute(DARK_ATTRIBUTE, "");
				else body.removeAttribute(DARK_ATTRIBUTE);
				for (const name of this.appliedTokens) body.style.removeProperty(name);
				this.appliedTokens = [];
				for (const [name, value] of Object.entries(snapshot.active.tokens)) {
					body.style.setProperty(name, value);
					this.appliedTokens.push(name);
				}
				this.themeColorMeta.content = getComputedStyle(body).backgroundColor;
				if (!this.themeColorMeta.isConnected) document.head.append(this.themeColorMeta);
			}
			dispose() {
				document.documentElement.style.removeProperty("color-scheme");
				const body = document.body;
				body.removeAttribute(DARK_ATTRIBUTE);
				for (const name of this.appliedTokens) body.style.removeProperty(name);
				this.appliedTokens = [];
				this.themeColorMeta.remove();
			}
		}

		// ---------- LayoutController (mirrors ui-layout) ----------
		class LayoutController {
			#panels;
			attachPanels(actions) {
				this.#panels = actions;
			}
			toggleSidebar() {
				this.#require().toggleSidebar();
			}
			openDetails() {
				this.#require().openDetails();
			}
			closeDetails() {
				this.#require().closeDetails();
			}
			#require() {
				if (this.#panels === void 0) throw new Error("layout: panel actions not wired (root entry not mounted)");
				return this.#panels;
			}
		}

		// ---------- i18n (follows DSH locale: zh / en) ----------
		const I18N = {
			zh: {
				'view.explorer': '资源管理器',
				'view.scm': '源代码管理',
				'view.sessions': '会话',
				'enter.toggleNewline': '回车=换行，Ctrl+Enter=发送（点击切换）',
				'enter.toggleSend': '回车=发送（点击切换）',
				'enter.aria': '切换回车行为',
				'settings.title': '设置 (DSH Settings)',
				'settings.open': '打开 DSH 设置',
				'explorer.empty': '没有工作区 — 从会话打开一个',
				'tree.collapse': '折叠',
				'tree.expand': '展开',
				'tree.reveal': '在资源管理器中定位',
				'tree.open': '打开',
				'tree.copyName': '复制文件名',
				'tree.copyRel': '复制相对路径',
				'tree.copyAbs': '复制绝对路径',
				'tree.copyRelShort': '复制相对路径 (F5)',
				'tree.copyAbsShort': '复制绝对路径 (F6)',
				'tree.copyRelCount': '复制相对路径 ({n})',
				'tree.copyAbsCount': '复制绝对路径 ({n})',
				'tree.copyPath': '复制路径',
				'tree.refresh': '刷新文件树',
				'scm.unstage': '取消暂存',
				'scm.discard': '放弃更改',
				'scm.discardAll': '放弃所有更改',
				'scm.discardDelete': '放弃更改（删除文件）',
				'scm.stage': '暂存更改',
				'scm.ignore': '添加到 .gitignore',
				'scm.reveal': '在资源管理器中打开',
				'scm.groupStaged': '暂存更改',
				'scm.groupChanges': '更改',
				'scm.history': '提交记录',
				'scm.loading': '加载中…',
				'scm.noFiles': '无文件',
				'scm.noCommits': '暂无提交',
				'scm.noWorkspace': '没有工作区',
				'scm.notRepo': '此文件夹尚未初始化 Git 仓库',
				'scm.init': '初始化仓库',
				'scm.initBusy': '初始化中…',
				'scm.noChanges': '没有更改',
				'scm.splitter': '拖动调整更改 / 提交记录高度',
				'scm.commitPlaceholder': '提交消息（Ctrl+Enter 提交）',
				'scm.committed': '已提交: {msg}',
				'scm.commitFailed': '提交失败: {err}',
				'scm.opFailed': 'git {op} 操作失败: {err}',
				'scm.done': '完成',
				'scm.op.stage': '已暂存',
				'scm.op.unstage': '已取消暂存',
				'scm.op.discard': '已放弃更改',
				'scm.op.discardAll': '已放弃所有更改',
				'scm.op.ignore': '已添加到 .gitignore',
				'scm.op.init': '已初始化仓库',
				'scm.confirm.discardAll': '放弃所有更改？全部文件 — 此操作不可撤销。',
				'scm.confirm.discard': '放弃更改？{path} — 此操作不可撤销。',
				'scm.confirm.discardDelete': '放弃更改（将删除该文件）？{path} — 此操作不可撤销。',
				'scm.confirm.allFiles': '全部文件',
				'scm.aria.unstage': '取消暂存 {path}',
				'scm.aria.discard': '放弃更改 {path}',
				'scm.aria.stage': '暂存更改 {path}',
				'scm.aria.ignore': '添加到 .gitignore {path}',
				'scm.aria.reveal': '在资源管理器中打开 {path}',
				'scm.aria.discardAll': '放弃所有更改',
				'editor.commit': '提交 {hash} — {file}',
				'editor.loadingDiff': '加载 diff…',
				'editor.staged': ' — 已暂存',
				'editor.untracked': ' — 未跟踪',
				'editor.workingTree': ' — 工作区',
				'editor.noFile': '没有打开文件 — 在资源管理器中选一个',
				'tabs.switch': '切换到该会话',
				'tabs.close': '关闭标签',
				'tabs.copyTitle': '复制标题',
				'tabs.copied': '已复制: {title}',
				'tabs.new': '新会话',
				'tabs.newAria': '新会话',
				'tabs.closeAria': '关闭标签',
				'jumpbar.unmark': '取消标记',
				'jumpbar.mark': '标记为重点',
				'app.resizeSidebar': '拖动调整侧边栏宽度',
				'app.resizeConv': '拖动调整会话宽度',
				'menu.copyCurrentPath': '复制当前文件路径',
				'menu.enterToggle': '切换回车模式：{mode}',
				'menu.enterNewline': '回车换行',
				'menu.enterSend': '回车发送',
				'menu.openSettings': '打开 DSH 设置',
				'toast.copiedAbs': '已复制绝对路径 ({n} 个)',
				'toast.copiedRel': '已复制相对路径 ({n} 个)',
				'toast.copiedName': '已复制文件名: {name}',
				'toast.copiedPath': '已复制路径: {path}',
				'toast.copied': '已复制: {text}',
				'toast.revealFailed': '打开资源管理器失败: {err}',
				'toast.copiedAbsPath': '已复制绝对路径: {path}',
				'toast.copiedRelPath': '已复制相对路径: {path}'
			},
			en: {
				'view.explorer': 'Explorer',
				'view.scm': 'Source Control',
				'view.sessions': 'Sessions',
				'enter.toggleNewline': 'Enter = newline, Ctrl+Enter = send (click to switch)',
				'enter.toggleSend': 'Enter = send (click to switch)',
				'enter.aria': 'Toggle Enter behavior',
				'settings.title': 'Settings (DSH Settings)',
				'settings.open': 'Open DSH settings',
				'explorer.empty': 'No workspace — open one from Sessions',
				'tree.collapse': 'Collapse',
				'tree.expand': 'Expand',
				'tree.reveal': 'Reveal in Explorer',
				'tree.open': 'Open',
				'tree.copyName': 'Copy file name',
				'tree.copyRel': 'Copy relative path',
				'tree.copyAbs': 'Copy absolute path',
				'tree.copyRelShort': 'Copy relative path (F5)',
				'tree.copyAbsShort': 'Copy absolute path (F6)',
				'tree.copyRelCount': 'Copy relative path ({n})',
				'tree.copyAbsCount': 'Copy absolute path ({n})',
				'tree.copyPath': 'Copy path',
				'tree.refresh': 'Refresh file tree',
				'scm.unstage': 'Unstage',
				'scm.discard': 'Discard changes',
				'scm.discardAll': 'Discard all changes',
				'scm.discardDelete': 'Discard (delete file)',
				'scm.stage': 'Stage changes',
				'scm.ignore': 'Add to .gitignore',
				'scm.reveal': 'Open in file manager',
				'scm.groupStaged': 'Staged changes',
				'scm.groupChanges': 'Changes',
				'scm.history': 'Commit history',
				'scm.loading': 'Loading…',
				'scm.noFiles': 'No files',
				'scm.noCommits': 'No commits',
				'scm.noWorkspace': 'No workspace',
				'scm.notRepo': 'This folder is not a Git repository yet',
				'scm.init': 'Initialize repository',
				'scm.initBusy': 'Initializing…',
				'scm.noChanges': 'No changes',
				'scm.splitter': 'Drag to resize changes / commit history',
				'scm.commitPlaceholder': 'Commit message (Ctrl+Enter to commit)',
				'scm.committed': 'Committed: {msg}',
				'scm.commitFailed': 'Commit failed: {err}',
				'scm.opFailed': 'git {op} failed: {err}',
				'scm.done': 'done',
				'scm.op.stage': 'Staged',
				'scm.op.unstage': 'Unstaged',
				'scm.op.discard': 'Discarded',
				'scm.op.discardAll': 'Discarded all changes',
				'scm.op.ignore': 'Added to .gitignore',
				'scm.op.init': 'Repository initialized',
				'scm.confirm.discardAll': 'Discard all changes? All files — this cannot be undone.',
				'scm.confirm.discard': 'Discard changes? {path} — this cannot be undone.',
				'scm.confirm.discardDelete': 'Discard changes (the file will be deleted)? {path} — this cannot be undone.',
				'scm.confirm.allFiles': 'All files',
				'scm.aria.unstage': 'Unstage {path}',
				'scm.aria.discard': 'Discard {path}',
				'scm.aria.stage': 'Stage {path}',
				'scm.aria.ignore': 'Add to gitignore {path}',
				'scm.aria.reveal': 'Reveal {path}',
				'scm.aria.discardAll': 'Discard all changes',
				'editor.commit': 'commit {hash} — {file}',
				'editor.loadingDiff': 'Loading diff…',
				'editor.staged': ' — Staged',
				'editor.untracked': ' — Untracked',
				'editor.workingTree': ' — Working Tree',
				'editor.noFile': 'No file open — pick a file in Explorer',
				'tabs.switch': 'Switch to this session',
				'tabs.close': 'Close tab',
				'tabs.copyTitle': 'Copy title',
				'tabs.copied': 'Copied: {title}',
				'tabs.new': 'New session',
				'tabs.newAria': 'New session',
				'tabs.closeAria': 'Close tab',
				'jumpbar.unmark': 'Unmark as important',
				'jumpbar.mark': 'Mark as important',
				'app.resizeSidebar': 'Drag to resize sidebar',
				'app.resizeConv': 'Drag to resize conversation',
				'menu.copyCurrentPath': 'Copy current file path',
				'menu.enterToggle': 'Toggle Enter mode: {mode}',
				'menu.enterNewline': 'Enter = newline',
				'menu.enterSend': 'Enter = send',
				'menu.openSettings': 'Open DSH settings',
				'toast.copiedAbs': 'Copied absolute path ({n})',
				'toast.copiedRel': 'Copied relative path ({n})',
				'toast.copiedName': 'Copied file name: {name}',
				'toast.copiedPath': 'Copied path: {path}',
				'toast.copied': 'Copied: {text}',
				'toast.revealFailed': 'Failed to open in file manager: {err}',
				'toast.copiedAbsPath': 'Copied absolute path: {path}',
				'toast.copiedRelPath': 'Copied relative path: {path}'
			}
		};
		let localeSvc = null;
		function translate(key, params) {
			let text;
			try {
				const svc = localeSvc || (pluginCtx && pluginCtx.locale) || null;
				if (svc && typeof svc.getLocale === 'function') {
					const active = svc.getLocale().active;
					text = I18N[active] ? I18N[active][key] : undefined;
				}
			} catch (e) {}
			if (text === undefined) text = I18N.zh[key];
			if (text === undefined) text = key;
			if (params && typeof text === 'string') {
				text = text.replace(/\{(\w+)\}/g, (m, n) => (n in params ? String(params[n]) : m));
			}
			return text;
		}
		const t = translate;

		// ---------- store ----------
		const SIDEBAR_DEFAULT = 280;
		const SIDEBAR_COLLAPSED = 56;
		const DETAILS_DEFAULT = 360;
		const CONV_DEFAULT = 420;
		function readStoredWidth(key, min, max, fallback) {
			try {
				const v = parseInt(localStorage.getItem(key), 10);
				if (v >= min && v <= max) return v;
			} catch (e) {}
			return fallback;
		}
		function createLayoutStore() {
			return defineStore({
				init: () => ({
					sidebar: readStoredWidth('dsh-vscode-shell-sidebar-w', 180, 720, SIDEBAR_DEFAULT),
					details: 0,
					convW: readStoredWidth('dsh-vscode-shell-conv-w', 300, 800, CONV_DEFAULT)
				}),
				actions: {
					setSidebar: (d, px) => {
						d.sidebar = Math.min(720, Math.max(180, Math.round(px)));
						try { localStorage.setItem('dsh-vscode-shell-sidebar-w', String(d.sidebar)); } catch (e) {}
					},
					setConvW: (d, px) => {
						d.convW = Math.min(800, Math.max(300, Math.round(px)));
						try { localStorage.setItem('dsh-vscode-shell-conv-w', String(d.convW)); } catch (e) {}
					},
					toggleSidebar: (d) => {
						d.sidebar = d.sidebar === 0 ? SIDEBAR_DEFAULT : 0;
					},
					openDetails: (d) => {
						if (d.details === 0) d.details = DETAILS_DEFAULT;
					},
					closeDetails: (d) => {
						d.details = 0;
					}
				}
			});
		}

		// ---------- shared mini-store (view + selected file + enter mode) ----------
		let storedEnterMode = 'newline';
		try { storedEnterMode = localStorage.getItem('dsh-vscode-shell-enter') || 'newline'; } catch (e) {}
		let vscodeState = { activeView: 'explorer', localeEpoch: 0, sidebarHidden: false, selectedPath: null, selectedPaths: [], fileContent: null, fileError: null, diffPath: null, diffText: null, diffKind: null, commitDiff: null, repoPath: null, scmFiles: [], scmCommits: [], scmBranch: null, scmBusy: false, rootPath: null, toast: null, enterMode: storedEnterMode, openTabs: [], treeEpoch: 0 };
		const vscodeListeners = new Set();
		const getVscodeSnapshot = () => vscodeState;
		const subscribeVscode = (fn) => { vscodeListeners.add(fn); return () => vscodeListeners.delete(fn); };
		const setVscode = (partial) => { vscodeState = { ...vscodeState, ...partial }; vscodeListeners.forEach((fn) => fn()); };
		const joinPath = (dir, name) => dir.replace(/[\\/]+$/, '') + '/' + name;
		let toastTimer = null;
		function showToast(text) {
			setVscode({ toast: text });
			if (toastTimer !== null) clearTimeout(toastTimer);
			toastTimer = setTimeout(() => setVscode({ toast: null }), 2500);
		}
		async function copyText(text) {
			try {
				await navigator.clipboard.writeText(text);
			} catch (e) {
				try {
					const ta = document.createElement('textarea');
					ta.value = text;
					ta.style.position = 'fixed';
					ta.style.opacity = '0';
					document.body.appendChild(ta);
					ta.select();
					document.execCommand('copy');
					document.body.removeChild(ta);
				} catch (e2) {}
			}
		}
		function relativePathOf(abs) {
			const root = vscodeState.rootPath;
			const rootNorm = root ? root.replace(/[\\/]+$/, '') : null;
			if (rootNorm && abs.startsWith(rootNorm)) return abs.slice(rootNorm.length + 1);
			return abs;
		}
		function copySelected(absolute) {
			const sel = vscodeState.selectedPaths && vscodeState.selectedPaths.length ? vscodeState.selectedPaths : (vscodeState.selectedPath ? [vscodeState.selectedPath] : []);
			if (!sel.length) return;
			const text = sel.map((p) => absolute ? p : relativePathOf(p)).join('\n');
			copyText(text);
			showToast(t(absolute ? 'toast.copiedAbs' : 'toast.copiedRel', { n: sel.length }));
		}
		async function revealPath(path) {
			try {
				const r = await fetch('/vscode-fs/reveal?path=' + encodeURIComponent(path));
				const j = await r.json();
				if (!r.ok) throw new Error(j.error || ('reveal failed ' + r.status));
			} catch (e) {
				showToast(t('toast.revealFailed', { err: (e && e.message ? e.message : e) }));
			}
		}
		function setEnterMode(mode) {
			setVscode({ enterMode: mode });
			try { localStorage.setItem('dsh-vscode-shell-enter', mode); } catch (e) {}
		}

		// ---------- custom context menu (right-click takeover, DSH page only) ----------
		let pluginCtx = null;
		let ctxMenuEl = null;
		let ctxMenuCleanup = [];
		function closeCtxMenu() {
			if (ctxMenuEl !== null) { ctxMenuEl.remove(); ctxMenuEl = null; }
			for (let i = 0; i < ctxMenuCleanup.length; i++) { try { ctxMenuCleanup[i](); } catch (e) {} }
			ctxMenuCleanup = [];
		}
		function openCtxMenu(x, y, items) {
			closeCtxMenu();
			const el = document.createElement('div');
			el.className = 'vsc-ctx';
			el.setAttribute('role', 'menu');
			for (let i = 0; i < items.length; i++) {
				const it = items[i];
				if (it === null || it.sep) {
					const hr = document.createElement('div');
					hr.className = 'vsc-ctx__sep';
					el.appendChild(hr);
					continue;
				}
				const item = document.createElement('div');
				item.className = 'vsc-ctx__item' + (it.danger ? ' vsc-ctx__item--danger' : '') + (it.disabled ? ' vsc-ctx__item--disabled' : '');
				item.setAttribute('role', 'menuitem');
				const label = document.createElement('span');
				label.className = 'vsc-ctx__label';
				label.textContent = it.label;
				item.appendChild(label);
				if (it.hint) {
					const hint = document.createElement('span');
					hint.className = 'vsc-ctx__hint';
					hint.textContent = it.hint;
					item.appendChild(hint);
				}
				if (!it.disabled) {
					item.addEventListener('click', (ev) => {
						ev.stopPropagation();
						closeCtxMenu();
						try { it.run(); } catch (err) { showToast(String(err && err.message ? err.message : err)); }
					});
				}
				el.appendChild(item);
			}
			document.body.appendChild(el);
			const r = el.getBoundingClientRect();
			const vw = window.innerWidth, vh = window.innerHeight;
			let left = Math.max(8, Math.min(x, vw - r.width - 8));
			let top = Math.max(8, Math.min(y, vh - r.height - 8));
			el.style.left = left + 'px';
			el.style.top = top + 'px';
			const onDocMouseDown = (e) => { if (ctxMenuEl !== null && !ctxMenuEl.contains(e.target)) closeCtxMenu(); };
			const onKey = (e) => { if (e.key === 'Escape') closeCtxMenu(); };
			const onScroll = () => closeCtxMenu();
			const onResize = () => closeCtxMenu();
			const onBlur = () => closeCtxMenu();
			// Attach one tick later so the very click that opened the menu (and any
			// still-in-flight mousedown) cannot immediately dismiss it.
			setTimeout(() => {
				document.addEventListener('mousedown', onDocMouseDown, true);
				document.addEventListener('keydown', onKey, true);
				window.addEventListener('scroll', onScroll, true);
				window.addEventListener('resize', onResize);
				window.addEventListener('blur', onBlur);
			}, 0);
			ctxMenuCleanup = [() => {
				document.removeEventListener('mousedown', onDocMouseDown, true);
				document.removeEventListener('keydown', onKey, true);
				window.removeEventListener('scroll', onScroll, true);
				window.removeEventListener('resize', onResize);
				window.removeEventListener('blur', onBlur);
			}];
			ctxMenuEl = el;
		}
		function refreshTree() {
			setVscode({ treeEpoch: vscodeState.treeEpoch + 1 });
		}
		function openSettingsDialog() {
			const openTrigger = () => {
				const trigger = document.querySelector('button[aria-haspopup="dialog"]');
				if (trigger) trigger.click();
			};
			if (vscodeState.activeView !== 'sessions') {
				setVscode({ activeView: 'sessions' });
				setTimeout(openTrigger, 350);
			} else {
				openTrigger();
			}
		}
		function openEditorHeaderMenu(e, path) {
			e.preventDefault();
			e.stopPropagation();
			const items = [];
			if (path) {
				items.push({ label: t('tree.copyPath'), run: () => { copyText(path); showToast(t('toast.copiedPath', { path: path })); } });
				items.push({ sep: true });
			}
			items.push({ label: t('tree.refresh'), run: refreshTree });
			openCtxMenu(e.clientX, e.clientY, items);
		}

		async function fsList(path) {
			const r = await fetch('/vscode-fs/list?path=' + encodeURIComponent(path));
			const j = await r.json();
			if (!r.ok) throw new Error(j.error || ('list failed ' + r.status));
			return j.items || [];
		}
		async function fsRead(path) {
			const r = await fetch('/vscode-fs/read?path=' + encodeURIComponent(path));
			const j = await r.json();
			if (!r.ok) throw new Error(j.error || ('read failed ' + r.status));
			return j.content;
		}
		function langFromPath(path) {
			const m = /\.([a-zA-Z0-9]+)$/.exec(path);
			if (!m) return undefined;
			const ext = m[1].toLowerCase();
			const map = {
				js: 'javascript', jsx: 'javascript', ts: 'typescript', tsx: 'typescript',
				json: 'json', jsonc: 'json',
				sh: 'bash', bash: 'bash', zsh: 'bash', shell: 'bash',
				py: 'python', rb: 'ruby', go: 'go', rs: 'rust', java: 'java',
				c: 'c', h: 'c', cpp: 'cpp', cc: 'cpp', cxx: 'cpp', hpp: 'cpp',
				cs: 'csharp', kt: 'kotlin', swift: 'swift', php: 'php',
				yaml: 'yaml', yml: 'yaml', toml: 'toml', ini: 'ini',
				md: 'markdown', mdx: 'mdx', html: 'html', htm: 'html',
				css: 'css', scss: 'scss', less: 'less', sql: 'sql', xml: 'xml', lua: 'lua'
			};
			return map[ext];
		}
		async function gitStatus(path) {
			const r = await fetch('/vscode-git/status?path=' + encodeURIComponent(path));
			const j = await r.json();
			if (!r.ok) throw new Error(j.error || ('status failed ' + r.status));
			return j;
		}
		async function gitDiff(repo, file, staged) {
			const r = await fetch('/vscode-git/diff?path=' + encodeURIComponent(repo) + '&file=' + encodeURIComponent(file) + (staged ? '&staged=1' : ''));
			const j = await r.json();
			if (!r.ok) throw new Error(j.error || ('diff failed ' + r.status));
			return j;
		}
		async function gitOp(repo, op, file, msg) {
			const qs = 'path=' + encodeURIComponent(repo) + '&op=' + encodeURIComponent(op) + (file ? '&file=' + encodeURIComponent(file) : '') + (msg ? '&msg=' + encodeURIComponent(msg) : '');
			const r = await fetch('/vscode-git/op?' + qs);
			const j = await r.json();
			if (!r.ok) throw new Error((j && j.error) || j.stderr || ('op failed ' + r.status));
			return j;
		}
		async function gitCommitFiles(repo, hash) {
			const r = await fetch('/vscode-git/commit-files?path=' + encodeURIComponent(repo) + '&hash=' + encodeURIComponent(hash));
			const j = await r.json();
			if (!r.ok) throw new Error(j.error || ('commit files failed ' + r.status));
			return j.files || [];
		}
		async function gitCommitDiff(repo, hash, file) {
			const r = await fetch('/vscode-git/commit-diff?path=' + encodeURIComponent(repo) + '&hash=' + encodeURIComponent(hash) + '&file=' + encodeURIComponent(file));
			const j = await r.json();
			if (!r.ok) throw new Error(j.error || ('commit diff failed ' + r.status));
			return j;
		}

		// ---------- icons ----------
		const EXPLORER_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/></svg>';
		const SCM_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="8" r="2.5"/><path d="M6 8.5v7M18 10.5c0 3.2-2.6 4-6 4"/></svg>';
		const SESSIONS_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12a8 8 0 0 1-8 8H5l-2 2V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"/></svg>';
		const COPY_REL_ICON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="5.5" y="5.5" width="7" height="7" rx="1"/><path d="M3.5 10.5v-7h7"/></svg>';
		const COPY_ABS_ICON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="5.5" y="5.5" width="7" height="7" rx="1"/><path d="M3.5 10.5v-7h7"/><path d="M1.5 1.5h4M1.5 3v-1.5H3"/></svg>';
		const REVEAL_ICON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M1.5 4A1.5 1.5 0 0 1 3 2.5h3L7.5 4H13A1.5 1.5 0 0 1 14.5 5.5v6A1.5 1.5 0 0 1 13 13H3A1.5 1.5 0 0 1 1.5 11.5v-7.5z"/><path d="M1.5 6.5h13"/></svg>';
		const SETTINGS_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
		function Icon({ svg }) {
			return React.createElement("span", { className: "vsc-icon", dangerouslySetInnerHTML: { __html: svg } });
		}

		// ---------- ActivityBar ----------
		const ACTIVITY_ITEMS = [
			{ view: 'explorer', icon: EXPLORER_ICON, labelKey: 'view.explorer' },
			{ view: 'scm', icon: SCM_ICON, labelKey: 'view.scm' },
			{ view: 'sessions', icon: SESSIONS_ICON, labelKey: 'view.sessions' }
		];
		function ActivityBar() {
			const vscode = React.useSyncExternalStore(subscribeVscode, getVscodeSnapshot);
			const items = ACTIVITY_ITEMS.map((it) => React.createElement("button", {
				key: it.view,
				className: "vsc-activitybar__item" + (vscode.activeView === it.view ? " vsc-activitybar__item--active" : ""),
				title: t(it.labelKey),
				"aria-label": t(it.labelKey),
				onClick: () => {
					// Clicking the active view toggles the sidebar (VS Code behavior);
					// clicking another view switches and expands it.
					if (vscode.activeView === it.view) {
						setVscode({ sidebarHidden: !vscode.sidebarHidden });
					} else {
						setVscode({ activeView: it.view, sidebarHidden: false });
					}
				}
			}, React.createElement(Icon, { svg: it.icon })));
			const newlineMode = vscode.enterMode === 'newline';
			items.push(React.createElement("div", { key: "spacer", className: "vsc-activitybar__spacer" }));
			items.push(React.createElement("div", { key: "footer", className: "vsc-activitybar__footer" },
				React.createElement("button", {
					className: "vsc-activitybar__item",
					title: t(newlineMode ? 'enter.toggleNewline' : 'enter.toggleSend'),
					"aria-label": t('enter.aria'),
					onClick: () => setEnterMode(newlineMode ? 'send' : 'newline')
				}, React.createElement("span", { className: "vsc-enter-badge" }, newlineMode ? "\u21B5" : "\u23CE")),
				React.createElement("button", {
					className: "vsc-activitybar__item",
					title: t('settings.title'),
					"aria-label": t('settings.open'),
					onClick: openSettingsDialog
				}, React.createElement(Icon, { svg: SETTINGS_ICON }))
			));
			return React.createElement("div", { className: "vsc-activitybar" }, items);
		}

		// ---------- FileTree ----------
		function FileNode({ name, fullPath, type, depth }) {
			const isDir = type === 'directory';
			const [expanded, setExpanded] = React.useState(isDir && depth === 0);
			const [children, setChildren] = React.useState(null);
			const vscode = React.useSyncExternalStore(subscribeVscode, getVscodeSnapshot);

			React.useEffect(() => {
				if (!isDir || !expanded || children !== null) return;
				let cancelled = false;
				fsList(fullPath).then((items) => { if (!cancelled) setChildren(items); }).catch(() => { if (!cancelled) setChildren([]); });
				return () => { cancelled = true; };
			}, [isDir, expanded, children, fullPath]);

			const onClick = (e) => {
				if (isDir) {
					setExpanded(!expanded);
					return;
				}
				const multi = e.ctrlKey || e.metaKey || e.shiftKey;
				const cur = vscodeState.selectedPaths || [];
				if (multi) {
					const next = cur.includes(fullPath) ? cur.filter((p) => p !== fullPath) : [...cur, fullPath];
					setVscode({ selectedPaths: next, selectedPath: fullPath });
				} else {
					setVscode({ selectedPaths: [fullPath] });
				}
				setVscode({ selectedPath: fullPath, fileContent: null, fileError: null, diffPath: null, diffText: null, diffKind: null, commitDiff: null });
				// Defer the file read to the next frame so the selection highlight
				// renders first — the editor content must never appear before the
				// tree node turns blue.
				requestAnimationFrame(() => {
					fsRead(fullPath).then((content) => {
						setVscode({ selectedPath: fullPath, fileContent: content, fileError: null });
					}).catch((err) => {
						setVscode({ selectedPath: fullPath, fileContent: null, fileError: String(err && err.message ? err.message : err) });
					});
				});
			};
			const act = (fn) => (e) => { e.stopPropagation(); fn(); };
			const isMulti = !isDir && (vscodeState.selectedPaths || []).includes(fullPath) && vscodeState.selectedPath !== fullPath;
			const onCtx = (e) => {
				e.preventDefault();
				e.stopPropagation();
				// VS Code behavior: right-click selects the node (keeps a multi-select
				// when the node is already part of it).
				if (isDir) {
					setVscode({ selectedPaths: [fullPath], selectedPath: fullPath });
				} else {
					const multi = (vscodeState.selectedPaths || []).includes(fullPath) && vscodeState.selectedPaths.length > 1;
					if (multi) setVscode({ selectedPath: fullPath });
					else setVscode({ selectedPaths: [fullPath], selectedPath: fullPath });
				}
				const items = [];
				if (isDir) {
					items.push({ label: t(expanded ? 'tree.collapse' : 'tree.expand'), run: () => setExpanded(!expanded) });
					items.push({ label: t('tree.reveal'), run: () => revealPath(fullPath) });
					items.push({ sep: true });
				} else {
					items.push({ label: t('tree.open'), run: () => { onClick({ ctrlKey: false, metaKey: false, shiftKey: false }); } });
					items.push({ label: t('tree.copyName'), run: () => { copyText(name); showToast(t('toast.copiedName', { name: name })); } });
					items.push({ label: t('tree.reveal'), run: () => revealPath(fullPath) });
					items.push({ sep: true });
				}
				const n = (vscodeState.selectedPaths || []).length;
				items.push({ label: t(n > 1 ? 'tree.copyRelCount' : 'tree.copyRel', { n: n }), run: () => copySelected(false) });
				items.push({ label: t(n > 1 ? 'tree.copyAbsCount' : 'tree.copyAbs', { n: n }), run: () => copySelected(true) });
				items.push({ sep: true });
				items.push({ label: t('tree.refresh'), run: refreshTree });
				openCtxMenu(e.clientX, e.clientY, items);
			};
			return React.createElement("div", null,
				React.createElement("div", {
					className: "vsc-treenode" + (vscode.selectedPath === fullPath ? " vsc-treenode--active" : "") + (isMulti ? " vsc-treenode--multi" : ""),
					style: { paddingLeft: (8 + depth * 14) + "px" },
					onClick: onClick,
					onContextMenu: onCtx,
					title: fullPath
				},
					React.createElement("span", { className: "vsc-treenode__chevron" }, isDir ? (expanded ? "\u25BE" : "\u25B8") : ""),
					React.createElement("span", { className: "vsc-treenode__name" }, name),
					!isDir && React.createElement("span", { className: "vsc-treenode__actions" },
						React.createElement("button", { className: "vsc-treenode__act", title: t('tree.copyRelShort'), "aria-label": t('tree.copyRel'), onClick: act(() => copySelected(false)) }, React.createElement(Icon, { svg: COPY_REL_ICON })),
						React.createElement("button", { className: "vsc-treenode__act", title: t('tree.copyAbsShort'), "aria-label": t('tree.copyAbs'), onClick: act(() => copySelected(true)) }, React.createElement(Icon, { svg: COPY_ABS_ICON })),
						React.createElement("button", { className: "vsc-treenode__act", title: t('tree.reveal'), "aria-label": t('tree.reveal'), onClick: act(() => revealPath(fullPath)) }, React.createElement(Icon, { svg: REVEAL_ICON }))
					)
				),
				isDir && expanded && children !== null && React.createElement("div", null,
					children.map((c) => React.createElement(FileNode, { key: c.name, name: c.name, fullPath: joinPath(fullPath, c.name), type: c.type, depth: depth + 1 }))
				)
			);
		}

		function FileTree({ useWorkspaces }) {
			const workspaces = useWorkspaces((s) => s);
			const vscode = React.useSyncExternalStore(subscribeVscode, getVscodeSnapshot);
			const items = workspaces.items || [];
			const recentId = workspaces.recentWorkspaceId;
			const ws = items.find((w) => w.id === recentId) || items[0];
			const rawPath = ws ? ws.path : null;
			const rootPath = rawPath ? rawPath.replace(/\\/g, '/') : null;
			React.useEffect(() => {
				if (rootPath && rootPath !== vscodeState.rootPath) setVscode({ rootPath });
			}, [rootPath]);
			if (!rootPath) {
				return React.createElement("div", { className: "vsc-explorer" },
					React.createElement("div", { className: "vsc-explorer-empty" }, t('explorer.empty'))
				);
			}
			return React.createElement("div", { className: "vsc-explorer" },
				React.createElement(FileNode, { key: "tree-" + vscode.treeEpoch, name: rootPath, fullPath: rootPath, type: "directory", depth: 0 })
			);
		}

		// ---------- ScmPane ----------
		function scmBadge(code) {
			if (code === '??') return { text: 'U', cls: 'vsc-scm__badge--untracked' };
			const c = code[1] !== ' ' ? code[1] : code[0];
			const cls = c === 'M' ? 'vsc-scm__badge--M' : c === 'A' ? 'vsc-scm__badge--A' : c === 'D' ? 'vsc-scm__badge--D' : 'vsc-scm__badge--untracked';
			return { text: c, cls };
		}
		async function refreshScm(rootPath) {
			const j = await gitStatus(rootPath);
			setVscode({ repoPath: j.repo, scmBranch: j.branch, scmFiles: j.files || [], scmCommits: j.commits || [] });
		}
		async function reloadDiff(path) {
			if (!vscodeState.repoPath) return;
			const f = vscodeState.scmFiles.find((x) => x.path === path);
			if (!f) { setVscode({ diffPath: null, diffText: null, diffKind: null }); return; }
			const staged = !!f.staged;
			try {
				const j = await gitDiff(vscodeState.repoPath, path, staged);
				setVscode({ diffPath: path, diffText: j.diff || '', diffKind: j.kind });
			} catch (e) {
				setVscode({ diffPath: path, diffText: '', diffKind: staged ? 'staged' : 'unstaged' });
			}
		}
		function ScmFileRow({ f, vscode, onOpen, onOp }) {
			const b = scmBadge(f.code);
			const buttons = [];
			const untracked = f.code[0] === '?';
			if (f.staged) {
				buttons.push(React.createElement("button", { key: "unstage", className: "vsc-scm__act", title: t('scm.unstage'), "aria-label": t('scm.aria.unstage', { path: f.path }), disabled: vscode.scmBusy, onClick: (e) => { e.stopPropagation(); onOp('unstage', f); } }, "\uFF0D"));
				buttons.push(React.createElement("button", { key: "discard", className: "vsc-scm__act", title: t('scm.discard'), "aria-label": t('scm.aria.discard', { path: f.path }), disabled: vscode.scmBusy, onClick: (e) => { e.stopPropagation(); onOp('discard', f); } }, "\u21BA"));
			} else if (!untracked) {
				buttons.push(React.createElement("button", { key: "stage", className: "vsc-scm__act", title: t('scm.stage'), "aria-label": t('scm.aria.stage', { path: f.path }), disabled: vscode.scmBusy, onClick: (e) => { e.stopPropagation(); onOp('stage', f); } }, "\uFF0B"));
				buttons.push(React.createElement("button", { key: "discard", className: "vsc-scm__act", title: t('scm.discard'), "aria-label": t('scm.aria.discard', { path: f.path }), disabled: vscode.scmBusy, onClick: (e) => { e.stopPropagation(); onOp('discard', f); } }, "\u21BA"));
			} else {
				buttons.push(React.createElement("button", { key: "stage", className: "vsc-scm__act", title: t('scm.stage'), "aria-label": t('scm.aria.stage', { path: f.path }), disabled: vscode.scmBusy, onClick: (e) => { e.stopPropagation(); onOp('stage', f); } }, "\uFF0B"));
				buttons.push(React.createElement("button", { key: "discard", className: "vsc-scm__act", title: t(untracked ? 'scm.discardDelete' : 'scm.discard'), "aria-label": t('scm.aria.discard', { path: f.path }), disabled: vscode.scmBusy, onClick: (e) => { e.stopPropagation(); onOp('discard', f); } }, "\u21BA"));
				buttons.push(React.createElement("button", { key: "ignore", className: "vsc-scm__act", title: t('scm.ignore'), "aria-label": t('scm.aria.ignore', { path: f.path }), disabled: vscode.scmBusy, onClick: (e) => { e.stopPropagation(); onOp('ignore', f); } }, "#"));
			}
			buttons.push(React.createElement("button", { key: "reveal", className: "vsc-scm__act", title: t('scm.reveal'), "aria-label": t('scm.aria.reveal', { path: f.path }), disabled: vscode.scmBusy, onClick: (e) => { e.stopPropagation(); revealPath(f.path.startsWith('/') || /^[a-zA-Z]:/.test(f.path) ? f.path : joinPath(vscode.rootPath || vscode.repoPath, f.path)); } }, React.createElement(Icon, { svg: REVEAL_ICON })));
			const isActive = vscode.diffPath === f.path || (untracked && vscode.selectedPath === joinPath(vscode.rootPath || vscode.repoPath, f.path));
			return React.createElement("div", {
				key: f.path,
				className: "vsc-scm__file" + (isActive ? " vsc-scm__file--active" : ""),
				onClick: () => onOpen(f),
				onContextMenu: (e) => {
					e.preventDefault();
					e.stopPropagation();
					const items = [];
					items.push({ label: t('tree.open'), run: () => onOpen(f) });
					items.push({ label: t('tree.reveal'), run: () => revealPath(f.path.startsWith('/') || /^[a-zA-Z]:/.test(f.path) ? f.path : joinPath(vscode.rootPath || vscode.repoPath, f.path)) });
					items.push({ sep: true });
					const untracked = f.code[0] === '?';
					if (f.staged) {
						items.push({ label: t('scm.unstage'), run: () => onOp('unstage', f) });
					} else {
						items.push({ label: t('scm.stage'), run: () => onOp('stage', f) });
					}
					items.push({ label: t(untracked ? 'scm.discardDelete' : 'scm.discard'), danger: true, run: () => onOp('discard', f) });
					if (untracked) items.push({ label: t('scm.ignore'), run: () => onOp('ignore', f) });
					openCtxMenu(e.clientX, e.clientY, items);
				},
				title: f.path
			},
				React.createElement("span", { className: "vsc-scm__badge " + b.cls }, b.text),
				React.createElement("span", { className: "vsc-scm__name" }, f.path),
				React.createElement("span", { className: "vsc-scm__actions" }, buttons)
			);
		}
		// One commit row in the history list: collapsed by default, click to
		// expand the files it changed (lazily fetched), click a file to see its
		// diff in the editor.
		function CommitRow({ c, vscode, repoPath, onOpenFile }) {
			const [open, setOpen] = React.useState(false);
			const [files, setFiles] = React.useState(null);
			React.useEffect(() => {
				if (!open || files !== null || !repoPath) return;
				let cancelled = false;
				gitCommitFiles(repoPath, c.hash).then((list) => { if (!cancelled) setFiles(list); })
					.catch(() => { if (!cancelled) setFiles([]); });
				return () => { cancelled = true; };
			}, [open, files, repoPath, c.hash]);
			const statusCls = (st) => {
				const map = { A: 'vsc-scm__badge--A', M: 'vsc-scm__badge--M', D: 'vsc-scm__badge--D' };
				return map[st] || 'vsc-scm__badge--untracked';
			};
			return React.createElement("div", null,
				React.createElement("div", {
					className: "vsc-scm__commit-row" + (open ? " vsc-scm__commit-row--open" : ""),
					title: c.subject + " (" + c.hash + ")",
					onClick: () => setOpen(!open)
				},
					React.createElement("span", { className: "vsc-scm__commit-chevron" }, open ? "\u25BE" : "\u25B8"),
					React.createElement("span", { className: "vsc-scm__commit-hash" }, c.hash),
					React.createElement("span", { className: "vsc-scm__commit-subject" }, c.subject),
					React.createElement("span", { className: "vsc-scm__commit-when" }, c.when)
				),
				open && React.createElement("div", { className: "vsc-scm__commit-files" },
					files === null
						? React.createElement("div", { className: "vsc-scm__commit-empty" }, t('scm.loading'))
						: files.length === 0
							? React.createElement("div", { className: "vsc-scm__commit-empty" }, t('scm.noFiles'))
							: files.map((f) => {
								const active = vscode.commitDiff && vscode.commitDiff.hash === c.hash && vscode.commitDiff.file === f.path;
								return React.createElement("div", {
									key: f.path,
									className: "vsc-scm__commit-file" + (active ? " vsc-scm__commit-file--active" : ""),
									onClick: () => onOpenFile(c.hash, f.path),
									title: f.path
								},
									React.createElement("span", { className: "vsc-scm__badge " + statusCls(f.status) }, f.status),
									React.createElement("span", { className: "vsc-scm__name" }, f.path)
								);
							})
				)
			);
		}
		function ScmPane({ useWorkspaces }) {
			const workspaces = useWorkspaces((s) => s);
			const vscode = React.useSyncExternalStore(subscribeVscode, getVscodeSnapshot);
			const [commitMsg, setCommitMsg] = React.useState('');
			// Vertical split between the changes pane (top) and the commit history
			// (bottom, bottom-aligned). px = top pane height in px (0 = unset),
			// h = measured height of the split container.
			const [split, setSplit] = React.useState({ h: 0, px: 0, dragging: false });
			const splitRef = React.useRef(null);
			const items = workspaces.items || [];
			const recentId = workspaces.recentWorkspaceId;
			const ws = items.find((w) => w.id === recentId) || items[0];
			const rootPath = ws ? ws.path : null;
			const repoPath = vscode.repoPath;

			React.useEffect(() => {
				const el = splitRef.current;
				if (!el) return;
				const update = () => {
					const h = el.clientHeight;
					if (h <= 0) return;
					setSplit((s) => {
						const max = Math.max(140, h - 100);
						const px = s.px === 0 ? Math.min(max, Math.max(140, Math.round(h * 0.45))) : Math.min(max, Math.max(140, s.px));
						return s.h === h && s.px === px ? s : { ...s, h, px };
					});
				};
				update();
				const ro = new ResizeObserver(update);
				ro.observe(el);
				return () => ro.disconnect();
			}, [repoPath]);

			const startSplitDrag = (e) => {
				e.preventDefault();
				const h = (splitRef.current && splitRef.current.clientHeight) || split.h;
				if (h <= 0) return;
				const startY = e.clientY;
				const startPx = split.px > 0 ? split.px : Math.max(140, Math.round(h * 0.45));
				const max = Math.max(140, h - 100);
				const onMove = (ev) => {
					const px = Math.max(140, Math.min(max, startPx + (ev.clientY - startY)));
					setSplit((s) => ({ ...s, px }));
				};
				const onUp = () => {
					window.removeEventListener('mousemove', onMove);
					window.removeEventListener('mouseup', onUp);
					document.body.style.cursor = '';
					setSplit((s) => ({ ...s, dragging: false }));
				};
				document.body.style.cursor = 'row-resize';
				setSplit((s) => ({ ...s, dragging: true }));
				window.addEventListener('mousemove', onMove);
				window.addEventListener('mouseup', onUp);
			};

			React.useEffect(() => {
				if (!rootPath) return;
				let cancelled = false;
				refreshScm(rootPath).catch(() => {
					if (!cancelled) setVscode({ repoPath: null, scmFiles: [], scmBranch: null });
				});
				return () => { cancelled = true; };
			}, [rootPath]);

			const onOpen = (f) => {
				if (!vscode.repoPath) return;
				setVscode({ commitDiff: null });
				if (f.code[0] === '?') {
					// Untracked: show the source with syntax highlighting instead of
					// an all-green diff (there is nothing to diff against).
					const abs = joinPath(vscode.rootPath || vscode.repoPath, f.path);
					setVscode({ selectedPath: abs, fileContent: null, fileError: null, diffPath: null, diffText: null, diffKind: null });
					fsRead(abs).then((content) => {
						setVscode({ selectedPath: abs, fileContent: content, fileError: null });
					}).catch((err) => {
						setVscode({ selectedPath: abs, fileContent: null, fileError: String(err && err.message ? err.message : err) });
					});
					return;
				}
				const staged = !!f.staged;
				setVscode({ diffPath: f.path, diffText: null, diffKind: staged ? 'staged' : null });
				gitDiff(vscode.repoPath, f.path, staged).then((j) => {
					setVscode({ diffPath: f.path, diffText: j.diff || '', diffKind: j.kind });
				}).catch(() => setVscode({ diffPath: f.path, diffText: '', diffKind: staged ? 'staged' : 'unstaged' }));
			};

			const onOpenCommitFile = (hash, file) => {
				if (!vscode.repoPath) return;
				setVscode({ commitDiff: { hash, file, text: null }, diffPath: null, diffText: null, diffKind: null, selectedPath: null, fileContent: null, fileError: null });
				gitCommitDiff(vscode.repoPath, hash, file).then((j) => {
					setVscode({ commitDiff: { hash, file, text: j.diff || '' } });
				}).catch(() => setVscode({ commitDiff: { hash, file, text: '' } }));
			};

			const onOp = (op, f) => {
				if (vscode.scmBusy) return;
				if (op === 'discard' || op === 'discardAll') {
					const confirmKey = op === 'discardAll' ? 'scm.confirm.discardAll' : (f && f.code[0] === '?' ? 'scm.confirm.discardDelete' : 'scm.confirm.discard');
					if (!window.confirm(t(confirmKey, { path: f ? f.path : t('scm.confirm.allFiles') }))) return;
				}
				const repo = vscode.repoPath || vscode.rootPath;
				if (!repo) return;
				setVscode({ scmBusy: true });
				(async () => {
					try {
						await gitOp(repo, op, f ? f.path : undefined);
						showToast(t('scm.op.' + op) + (f ? ' ' + f.path : '') + ' — ' + t('scm.done'));
						const root = vscodeState.rootPath;
						if (root) {
							await refreshScm(root);
							if (vscodeState.diffPath && (!f || f.path === vscodeState.diffPath)) await reloadDiff(vscodeState.diffPath);
						}
					} catch (e) {
						showToast(t('scm.opFailed', { op: op, err: (e && e.message ? e.message : e) }));
					} finally {
						setVscode({ scmBusy: false });
					}
				})();
			};

			const doCommit = () => {
				const msg = commitMsg.trim();
				if (!msg || vscode.scmBusy || !vscode.repoPath) return;
				setVscode({ scmBusy: true });
				(async () => {
					try {
						await gitOp(vscode.repoPath, 'commit', undefined, msg);
						setCommitMsg('');
						showToast(t('scm.committed', { msg: msg.slice(0, 40) }));
						const root = vscodeState.rootPath;
						if (root) {
							await refreshScm(root);
							if (vscodeState.diffPath) await reloadDiff(vscodeState.diffPath);
						}
					} catch (e) {
						showToast(t('scm.commitFailed', { err: (e && e.message ? e.message : e) }));
					} finally {
						setVscode({ scmBusy: false });
					}
				})();
			};

			if (!rootPath) {
				return React.createElement("div", { className: "vsc-scm" }, React.createElement("div", { className: "vsc-scm-empty" }, t('scm.noWorkspace')));
			}
			const files = vscode.scmFiles;
			const stagedFiles = files.filter((f) => f.staged);
			const changesFiles = files.filter((f) => !f.staged);
			const group = (title, list, extra) => (list.length === 0 && !extra) ? null : React.createElement("div", { key: title, className: "vsc-scm__group" },
				React.createElement("div", { className: "vsc-scm__group-title" }, title + " (" + list.length + ")"),
				extra,
				list.map((f) => React.createElement(ScmFileRow, { key: f.path, f: f, vscode: vscode, onOpen: onOpen, onOp: onOp }))
			);
			const commitBox = vscode.repoPath ? React.createElement("textarea", {
				key: "commit",
				className: "vsc-scm__commit-input",
				placeholder: t('scm.commitPlaceholder'),
				value: commitMsg,
				rows: 2,
				onChange: (e) => setCommitMsg(e.target.value),
				onKeyDown: (e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); doCommit(); } }
			}) : null;
			return React.createElement("div", { className: "vsc-scm" },
				React.createElement("div", { className: "vsc-scm__header" },
					React.createElement("span", { className: "vsc-scm__branch" }, (vscode.scmBranch ? "\u2387 " + vscode.scmBranch : "")),
					React.createElement("span", { className: "vsc-scm__header-actions" },
						React.createElement("button", { className: "vsc-scm__act", title: t('scm.discardAll'), "aria-label": t('scm.aria.discardAll'), disabled: vscode.scmBusy, onClick: () => onOp('discardAll', null) }, "\u21BA")
					)
				),
				!vscode.repoPath
					? React.createElement("div", { className: "vsc-scm-init" },
						React.createElement("div", { className: "vsc-scm-empty" }, t('scm.notRepo')),
						React.createElement("button", { className: "vsc-scm-init__btn", disabled: vscode.scmBusy, onClick: () => onOp('init', null) }, vscode.scmBusy ? t('scm.initBusy') : t('scm.init'))
					)
					: React.createElement("div", { className: "vsc-scm__split", ref: splitRef },
						React.createElement("div", { className: "vsc-scm__changes", style: { height: (split.px > 0 ? split.px : 140) + "px" } },
							files.length === 0
								? React.createElement("div", { key: "empty", className: "vsc-scm-empty" }, t('scm.noChanges'))
								: React.createElement("div", { key: "groups" },
									group(t('scm.groupStaged'), stagedFiles),
									group(t('scm.groupChanges'), changesFiles, commitBox)
								)
						),
						React.createElement("div", {
							className: "vsc-scm__splitter" + (split.dragging ? " vsc-scm__splitter--active" : ""),
							onMouseDown: startSplitDrag,
							title: t('scm.splitter')
						}),
						React.createElement("div", { className: "vsc-scm__commits" },
							React.createElement("div", { className: "vsc-scm__group-title" }, t('scm.history') + " (" + vscode.scmCommits.length + ")"),
							vscode.scmCommits.length === 0
								? React.createElement("div", { className: "vsc-scm__commit-empty" }, t('scm.noCommits'))
								: vscode.scmCommits.map((c) => React.createElement(CommitRow, { key: c.hash, c: c, vscode: vscode, repoPath: vscode.repoPath, onOpenFile: onOpenCommitFile }))
						)
					)
			);
		}

		// ---------- EditorPane ----------
		function DiffView({ diff }) {
			const rows = (diff || '').split('\n').map((line, i) => {
				let cls = 'vsc-diff__ctx';
				if (line.startsWith('+++') || line.startsWith('---')) cls = 'vsc-diff__hdr';
				else if (line.startsWith('@@')) cls = 'vsc-diff__hunk';
				else if (line.startsWith('+')) cls = 'vsc-diff__add';
				else if (line.startsWith('-')) cls = 'vsc-diff__del';
				else if (/^(diff |index |new file|deleted file|similarity|rename )/.test(line)) cls = 'vsc-diff__hdr';
				return React.createElement("div", { key: i, className: "vsc-diff__line " + cls }, line || ' ');
			});
			return React.createElement("div", { className: "vsc-diff" }, rows);
		}

		function EditorPane() {
			const vscode = React.useSyncExternalStore(subscribeVscode, getVscodeSnapshot);
			if (vscode.commitDiff) {
				const cd = vscode.commitDiff;
				return React.createElement("div", { className: "vsc-editor" },
					React.createElement("div", { className: "vsc-editor__header", onContextMenu: (e) => openEditorHeaderMenu(e, cd.file) }, t('editor.commit', { hash: cd.hash, file: cd.file })),
					cd.text === null
						? React.createElement("div", { className: "vsc-editor-empty" }, t('editor.loadingDiff'))
						: React.createElement(DiffView, { diff: cd.text })
				);
			}
			if (vscode.diffPath) {
				const kindLabel = vscode.diffKind === 'staged' ? t('editor.staged') : vscode.diffKind === 'untracked' ? t('editor.untracked') : vscode.diffKind === 'unstaged' ? t('editor.workingTree') : '';
				return React.createElement("div", { className: "vsc-editor" },
					React.createElement("div", { className: "vsc-editor__header", onContextMenu: (e) => openEditorHeaderMenu(e, vscode.diffPath) }, vscode.diffPath + kindLabel),
					vscode.diffText === null
						? React.createElement("div", { className: "vsc-editor-empty" }, t('editor.loadingDiff'))
						: React.createElement(DiffView, { diff: vscode.diffText })
				);
			}
			if (!vscode.selectedPath) {
				return React.createElement("div", { className: "vsc-editor" },
					React.createElement("div", { className: "vsc-editor-empty" }, t('editor.noFile'))
				);
			}
			const text = vscode.fileContent || '';
			const readLines = text.split('\n').map((t, i) => ({ number: i + 1, text: t }));
			return React.createElement("div", { className: "vsc-editor" },
				React.createElement("div", { className: "vsc-editor__header", onContextMenu: (e) => openEditorHeaderMenu(e, vscode.selectedPath) }, vscode.selectedPath),
				vscode.fileError !== null
					? React.createElement("div", { className: "vsc-editor__error" }, String(vscode.fileError))
					: React.createElement(ReadBlock, {
						label: vscode.selectedPath,
						lines: readLines,
						totalLines: readLines.length,
						lang: langFromPath(vscode.selectedPath),
						maxLines: 100000,
						className: "vsc-editor-readblock"
					})
			);
		}

		// ---------- TabStrip (multi-conversation tabs) ----------
		function TabStrip({ useSessions, openSession, newSession, clearSession }) {
			const sessions = useSessions((s) => s);
			const vscode = React.useSyncExternalStore(subscribeVscode, getVscodeSnapshot);
			const current = sessions.current;
			const byId = sessions.byId || {};
			const tabs = vscode.openTabs || [];
			React.useEffect(() => {
				if (current !== undefined && current !== null && !vscodeState.openTabs.includes(current)) {
					setVscode({ openTabs: [...vscodeState.openTabs, current] });
				}
			}, [current]);
			// Close a tab like VS Code: drop it from the strip, then move the
			// active session away from a closed tab — to the adjacent tab when
			// others remain, or clear the selection (empty state, content gone)
			// when the last tab is closed.
			const closeTab = (id) => {
				const prev = vscodeState.openTabs;
				const idx = prev.indexOf(id);
				const next = prev.filter((x) => x !== id);
				setVscode({ openTabs: next });
				if (id !== current) return;
				if (next.length === 0) {
					if (clearSession) clearSession();
					return;
				}
				openSession(next[Math.min(idx, next.length - 1)]);
			};
			return React.createElement("div", { className: "vsc-tabs" },
				tabs.map((id) => {
					const row = byId[id];
					const title = row ? (row.displayTitle || row.title || id) : id;
					return React.createElement("div", {
						key: id,
						className: "vsc-tab" + (id === current ? " vsc-tab--active" : ""),
						onClick: () => openSession(id),
						onContextMenu: (e) => {
							e.preventDefault();
							e.stopPropagation();
							const items = [];
							if (id !== current) items.push({ label: t('tabs.switch'), run: () => openSession(id) });
							items.push({ label: t('tabs.close'), run: () => closeTab(id) });
							items.push({ label: t('tabs.copyTitle'), run: () => { copyText(title); showToast(t('tabs.copied', { title: title })); } });
							openCtxMenu(e.clientX, e.clientY, items);
						},
						title: title
					},
						React.createElement("span", { className: "vsc-tab__label" }, title),
						React.createElement("button", {
							className: "vsc-tab__close",
							"aria-label": t('tabs.closeAria'),
							onClick: (e) => { e.stopPropagation(); closeTab(id); }
						}, "\u00D7")
					);
				}),
				React.createElement("div", { key: "spacer", className: "vsc-tabs__spacer" }),
				React.createElement("button", {
					key: "new",
					className: "vsc-tab-new",
					title: t('tabs.new'),
					"aria-label": t('tabs.newAria'),
					onClick: () => { if (newSession) newSession(); }
				}, "\uFF0B")
			);
		}

		// ---------- JumpBar (conversation quick-jump rail) ----------
		// A thin rail on the right edge of the conversation: one dot per user
		// message (data-chat-flow-kind="user"), click to scroll to it. Dots can
		// be marked as important (star) — persisted in localStorage.
		function JumpBar({ useSessions }) {
			const currentSession = useSessions((s) => s.current);
			React.useSyncExternalStore(subscribeVscode, getVscodeSnapshot);
			const [dots, setDots] = React.useState([]);
			const [composerH, setComposerH] = React.useState(0);
			const [view, setView] = React.useState({ top: 0, height: 100 });
			const [marks, setMarks] = React.useState(() => {
				try { return JSON.parse(localStorage.getItem('dsh-vscode-shell-jump-marks') || '{}') || {}; } catch (e) { return {}; }
			});
			React.useEffect(() => {
				let raf = 0;
				let stopped = false;
				const update = () => {
					const conv = document.querySelector('.vsc-conversation__body');
					if (!conv) return;
					// The rail must cover only the message list — stop above the
					// bottom composer (input box), not at the page bottom.
					const composer = conv.querySelector('[class*="composerSeat"],[class*="composer"],[class*="Composer"]');
					const ch = composer ? composer.offsetHeight : 0;
					setComposerH((prev) => (Math.abs(prev - ch) > 2 ? ch : prev));
					const scrollEl = conv.querySelector('[class*="scrollBody"]') || conv;
					const sRect = scrollEl.getBoundingClientRect();
					// Viewport indicator: the fraction of the whole content that is
					// currently visible (minimap-style slider on the rail).
					if (scrollEl.scrollHeight > 0 && scrollEl.clientHeight > 0) {
						const vh = Math.min(100, (scrollEl.clientHeight / scrollEl.scrollHeight) * 100);
						const vt = Math.min(100 - vh, (scrollEl.scrollTop / scrollEl.scrollHeight) * 100);
						setView((prev) => (Math.abs(prev.top - vt) < 0.3 && Math.abs(prev.height - vh) < 0.3 ? prev : { top: vt, height: vh }));
					}
					const items = [...conv.querySelectorAll('[data-chat-flow-kind="user"]')];
					const list = items.map((el) => {
						const r = el.getBoundingClientRect();
						// Position the dot by the message's fraction of the WHOLE
						// content (fixed rail, like a minimap) — not its position
						// within the viewport (which moves as you scroll).
						const topInContent = scrollEl.scrollTop + (r.top - sRect.top);
						const pct = scrollEl.scrollHeight > 0 ? (topInContent / scrollEl.scrollHeight) * 100 : 0;
						return { key: el.getAttribute('data-chat-anchor-key') || '', el, pct: Math.max(0, Math.min(100, pct)) };
					});
					setDots(list);
				};
				const schedule = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); };
				// DSH paginates history ("load older"): auto-click it so every turn's
				// user message is materialized in the DOM and gets a dot (capped).
				const loadAllHistory = async () => {
					const conv = document.querySelector('.vsc-conversation__body');
					if (!conv) return;
					const findOlder = () => {
						let o = conv.querySelector('[class*="_older"],[class*="older"],[class*="loadMore"],[class*="load-more"]');
						if (!o) return null;
						const inner = o.querySelector('button');
						if (inner) return inner;
						if (typeof o.click === 'function') return o;
						const outer = o.closest('button');
						return outer && typeof outer.click === 'function' ? outer : null;
					};
					// Conversation content (and its "load older" control) materializes
					// asynchronously after a session opens — wait for it before clicking.
					for (let w = 0; w < 40 && !stopped; w++) {
						if (findOlder()) break;
						await new Promise((r) => setTimeout(r, 1000));
					}
					let prev = -1;
					let noGrow = 0;
					for (let i = 0; i < 60 && !stopped; i++) {
						const older = findOlder();
						if (!older) break;
						older.click();
						await new Promise((r) => setTimeout(r, 1200));
						const now = conv.querySelectorAll('[class*="_flowItem"]').length;
						if (now === prev) { noGrow++; if (noGrow >= 3) break; } else noGrow = 0;
						prev = now;
					}
					update();
				};
				update();
				const conv = document.querySelector('.vsc-conversation__body');
				if (conv) {
					const mo = new MutationObserver(schedule);
					mo.observe(conv, { childList: true, subtree: true });
					window.addEventListener('resize', schedule);
					const scrollEl = conv.querySelector('[class*="scrollBody"]') || conv;
					const onScroll = () => schedule();
					scrollEl.addEventListener('scroll', onScroll, { passive: true });
					loadAllHistory();
					return () => { stopped = true; mo.disconnect(); window.removeEventListener('resize', schedule); scrollEl.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
				}
				// Re-run on session switch so pagination is expanded for each new session.
			}, [currentSession]);
			const tipPos = (pct) => {
				if (pct < 20) return { top: '4px', transform: 'translateY(0)' };
				if (pct > 80) return { top: 'auto', bottom: '4px', transform: 'translateY(0)' };
				return { top: '50%', transform: 'translateY(-50%)' };
			};
			const jump = (dot) => {
				const conv = document.querySelector('.vsc-conversation__body');
				if (!conv || !dot.el) return;
				const scrollEl = conv.querySelector('[class*="scrollBody"]') || conv;
				const sRect = scrollEl.getBoundingClientRect();
				const r = dot.el.getBoundingClientRect();
				scrollEl.scrollTo({ top: scrollEl.scrollTop + (r.top - sRect.top) - 10, behavior: 'smooth' });
			};
			const toggleMarkKey = (key) => {
				const next = { ...marks, [key]: !marks[key] };
				setMarks(next);
				try { localStorage.setItem('dsh-vscode-shell-jump-marks', JSON.stringify(next)); } catch (err) {}
			};
			const [hover, setHover] = React.useState(null);
			if (dots.length === 0) return null;
			return React.createElement("div", { className: "vsc-jumpbar", style: { bottom: composerH + "px" } },
				React.createElement("div", { className: "vsc-jumpbar__line" },
					React.createElement("div", { className: "vsc-jumpbar__viewport", style: { top: view.top + "%", height: view.height + "%" } })
				),
				dots.map((dot) => {
					const len = (dot.el.textContent || '').trim().length;
					const raw = (dot.el.textContent || '').trim().replace(/\s+/g, ' ');
					const tm = raw.match(/^(.*?)\s*((?:\d{1,2}月\d{1,2}日\s*)?\d{1,2}:\d{2}(?::\d{2})?)\s*$/) || raw.match(/^(.*?)\s*((?:[A-Z][a-z]{2}\s+\d{1,2},?\s+(?:\d{4}\s+)?)?\d{1,2}:\d{2}(?::\d{2})?)\s*$/);
					const text = (tm ? tm[1] : raw).slice(0, 2000);
					const time = tm ? tm[2] : null;
					const size = len < 20 ? 7 : len < 60 ? 9 : len < 150 ? 11 : 13;
					return React.createElement("div", {
						key: dot.key,
						className: "vsc-jumpbar__dot" + (marks[dot.key] ? " vsc-jumpbar__dot--marked" : ""),
						style: { top: dot.pct + "%", width: size + "px", height: size + "px", right: (7.5 - size / 2) + "px" },
						onClick: () => jump(dot),
						onMouseEnter: () => setHover(dot.key),
						onMouseLeave: () => setHover(null)
					},
						// The tooltip lives INSIDE the dot so moving the mouse from the
						// dot onto the tooltip does not trigger mouseleave and the
						// mark button stays clickable.
						hover === dot.key && React.createElement("div", { className: "vsc-jumpbar__tip", style: tipPos(dot.pct), onClick: (e) => e.stopPropagation() },
							React.createElement("div", { className: "vsc-jumpbar__tip-text" }, text), time ? React.createElement("div", { className: "vsc-jumpbar__tip-time" }, time) : null,
							React.createElement("button", {
								className: "vsc-jumpbar__tip-star" + (marks[dot.key] ? " on" : ""),
								title: t(marks[dot.key] ? 'jumpbar.unmark' : 'jumpbar.mark'),
								onClick: () => toggleMarkKey(dot.key)
							}, marks[dot.key] ? "\u2605" : "\u2606")
						)
					);
				})
			);
		}

		// ---------- AppFrame (4-column VS Code-style frame) ----------
		function AppFrame({ useStore, useSessions, actions, renderSlot, openSession, newSession, clearSession }) {
			const panels = useStore((s) => s);
			const vscode = React.useSyncExternalStore(subscribeVscode, getVscodeSnapshot);
			const detailsSession = useSessions((s) => {
				const current = s.current;
				return current !== void 0 && s.byId[current]?.blank === false ? current : void 0;
			});
			const sidebarCollapsed = vscode.sidebarHidden || panels.sidebar === 0;
			const sidebarW = sidebarCollapsed ? SIDEBAR_COLLAPSED : panels.sidebar;
			const detailsW = detailsSession === void 0 ? 0 : panels.details;

			const startResize = (e) => {
				e.preventDefault();
				const startX = e.clientX;
				const startW = panels.sidebar === 0 ? SIDEBAR_DEFAULT : panels.sidebar;
				const onMove = (ev) => {
					actions.setSidebar(startW + (ev.clientX - startX));
				};
				const onUp = () => {
					window.removeEventListener('mousemove', onMove);
					window.removeEventListener('mouseup', onUp);
					document.body.style.cursor = '';
				};
				document.body.style.cursor = 'col-resize';
				window.addEventListener('mousemove', onMove);
				window.addEventListener('mouseup', onUp);
			};

			// Conversation (right panel) resizer: drag left to widen.
			const startResizeConv = (e) => {
				e.preventDefault();
				const startX = e.clientX;
				const startW = panels.convW || CONV_DEFAULT;
				const onMove = (ev) => {
					actions.setConvW(startW - (ev.clientX - startX));
				};
				const onUp = () => {
					window.removeEventListener('mousemove', onMove);
					window.removeEventListener('mouseup', onUp);
					document.body.style.cursor = '';
				};
				document.body.style.cursor = 'col-resize';
				window.addEventListener('mousemove', onMove);
				window.addEventListener('mouseup', onUp);
			};

			let sidebarContent;
			if (vscode.activeView === 'explorer') sidebarContent = renderSlot("explorer", {});
			else if (vscode.activeView === 'scm') sidebarContent = renderSlot("scm", {});
			else sidebarContent = renderSlot("sidebar", { collapsed: sidebarCollapsed, width: sidebarW });

			const children = [
				React.createElement("div", { key: "activitybar", className: "vsc-activitybar", children: renderSlot("activityBar", {}) }),
				React.createElement("div", { key: "sidebarArea", className: "vsc-sidebar", children: sidebarContent }),
				React.createElement("div", { key: "resizer", className: "vsc-resizer", onMouseDown: startResize, title: t('app.resizeSidebar') }),
				React.createElement("div", { key: "editor", className: "vsc-editor", children: renderSlot("editor", {}) }),
				React.createElement("div", { key: "resizerConv", className: "vsc-resizer", onMouseDown: startResizeConv, title: t('app.resizeConv') }),
				React.createElement("div", { key: "conversation", className: "vsc-conversation", children: [
					React.createElement(TabStrip, { key: "tabs", useSessions: useSessions, openSession: openSession, newSession: newSession, clearSession: clearSession }),
					React.createElement("div", { key: "convbody", className: "vsc-conversation__body", children: renderSlot("conversation", {}) }),
					React.createElement(JumpBar, { key: "jumpbar", useSessions: useSessions })
				] })
			];
			if (detailsW > 0) {
				children.push(React.createElement("div", { key: "details", className: "vsc-details", style: { width: detailsW + "px" }, children: renderSlot("details", {}) }));
			}
			children.push(React.createElement("div", { key: "overlay", className: "vsc-overlay", children: renderSlot("shell.overlay", {}) }));
			if (vscode.toast) {
				children.push(React.createElement("div", { key: "toast", className: "vsc-toast" }, vscode.toast));
			}

			return React.createElement("div", {
				className: "vsc-frame",
				style: { gridTemplateColumns: "48px " + sidebarW + "px 5px minmax(0, 1fr) 5px " + (panels.convW || CONV_DEFAULT) + "px" },
				children: children
			});
		}

		// ---------- apply ----------
		function apply(ctx) {
			const layout = new LayoutController();
			localeSvc = ctx.locale || null;
			ctx.effect(() => {
				const off = ctx.on('locale/change', () => setVscode({ localeEpoch: vscodeState.localeEpoch + 1 }));
				return off;
			}, "vscode: locale sync");
			ctx.effect(() => {
				const disposeService = ctx.reflect.provide("layout", layout);
				const disposeRegistration = ctx.slots.register({
					name: "root",
					children: {
						"activityBar": { kind: "single", scope: "root" },
						"sidebar": { kind: "single", scope: "root" },
						"explorer": { kind: "single", scope: "root" },
						"scm": { kind: "single", scope: "root" },
						"editor": { kind: "single", scope: "root" },
						"conversation": { kind: "single", scope: "session-maybe" },
						"details": { kind: "single", scope: "session" },
						"shell.overlay": { kind: "list", scope: "root" }
					},
					store: createLayoutStore,
					inject: (actions) => {
						layout.attachPanels(actions);
						return {
							openSession: (id) => ctx.sessions.open(id),
							newSession: () => ctx.workspaces.startSession(),
							clearSession: () => ctx.sessions.clear()
						};
					}
				}, AppFrame);
				const disposeActivityBar = ctx.slots.register({ name: "activityBar", id: "vscode-activitybar" }, ActivityBar);
				const disposeExplorer = ctx.slots.register({ name: "explorer", id: "vscode-explorer" }, FileTree);
				const disposeScm = ctx.slots.register({ name: "scm", id: "vscode-scm" }, ScmPane);
				const disposeEditor = ctx.slots.register({ name: "editor", id: "vscode-editor" }, EditorPane);
				return () => {
					disposeRegistration();
					disposeActivityBar();
					disposeExplorer();
					disposeScm();
					disposeEditor();
					disposeService();
				};
			}, "vscode: service + root registration");
			ctx.effect(() => {
				const presenter = new ThemePresenter();
				// Stack the VS Code Dark+/Light+ palette through the official
				// theme service (replaces relying on DSH default tokens +
				// CSS fallbacks). Re-emitting theme/change re-applies below.
				const disposeOverride = ctx.theme.overrideTokens("dsh-vscode-shell", VSCODE_TOKENS);
				presenter.apply(ctx.theme.getTheme());
				const off = ctx.on("theme/change", (snapshot) => {
					presenter.apply(snapshot);
				});
				return () => {
					off();
					disposeOverride();
					presenter.dispose();
				};
			}, "vscode: theme presenter + VS Code token layer");

			// F5 = copy relative path, F6 = copy absolute path (of the selected file)
			ctx.effect(() => {
				const onKey = (e) => {
					if ((e.key === 'F5' || e.key === 'F6') && vscodeState.selectedPath) {
						e.preventDefault();
						e.stopPropagation();
						const path = vscodeState.selectedPath;
						const text = e.key === 'F6' ? path : relativePathOf(path);
						copyText(text);
						showToast(t(e.key === 'F6' ? 'toast.copiedAbsPath' : 'toast.copiedRelPath', { path: text }));
					}
				};
				window.addEventListener('keydown', onKey);
				return () => window.removeEventListener('keydown', onKey);
			}, "vscode: path copy shortcuts");

			// Enter = newline (when in newline mode); Ctrl+Enter still sends.
			ctx.effect(() => {
				const onKey = (e) => {
					if (vscodeState.enterMode !== 'newline') return;
					if (e.key !== 'Enter') return;
					if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
					const target = e.target;
					if (target && (target.tagName === 'TEXTAREA' || target.isContentEditable)) {
						e.preventDefault();
						e.stopPropagation();
						try {
							document.execCommand('insertText', false, '\n');
						} catch (err) {
							try {
								const start = target.selectionStart;
								const end = target.selectionEnd;
								const v = target.value;
								target.value = v.slice(0, start) + '\n' + v.slice(end);
								target.selectionStart = target.selectionEnd = start + 1;
								target.dispatchEvent(new Event('input', { bubbles: true }));
							} catch (e2) {}
						}
					}
				};
				document.addEventListener('keydown', onKey, true);
				return () => document.removeEventListener('keydown', onKey, true);
			}, "vscode: enter newline remap");

			// Right-click takeover inside the DSH page: replace the browser's native
			// context menu with the custom VS Code-like menu in the areas the
			// workbench owns (activity bar, sidebar background, tab strip). Tree
			// nodes / SCM rows / tabs / editor headers open their own menus via
			// React onContextMenu; editable fields keep the native menu.
			ctx.effect(() => {
				pluginCtx = ctx;
				const onCtx = (e) => {
					if (e.defaultPrevented) return;
					const target = e.target;
					if (!(target instanceof Element)) return;
					if (target.closest('input, textarea, select, [contenteditable="true"]')) return;
					if (target.closest('.vsc-treenode, .vsc-scm__file, .vsc-tab, .vsc-editor__header')) return;
					const frame = target.closest('.vsc-frame');
					if (!frame) return;
					if (!target.closest('.vsc-activitybar, .vsc-sidebar, .vsc-tabs')) return;
					e.preventDefault();
					e.stopPropagation();
					const items = [];
					items.push({ label: t('tree.refresh'), run: refreshTree });
					if (vscodeState.selectedPath) {
						items.push({ label: t('menu.copyCurrentPath'), run: () => copySelected(false) });
					}
					items.push({ sep: true });
					items.push({ label: t('menu.enterToggle', { mode: t(vscodeState.enterMode === 'newline' ? 'menu.enterNewline' : 'menu.enterSend') }), run: () => setEnterMode(vscodeState.enterMode === 'newline' ? 'send' : 'newline') });
					items.push({ label: t('menu.openSettings'), run: openSettingsDialog });
					openCtxMenu(e.clientX, e.clientY, items);
				};
				document.addEventListener('contextmenu', onCtx, true);
				return () => {
					document.removeEventListener('contextmenu', onCtx, true);
					closeCtxMenu();
				};
			}, "vscode: custom context menu");
		}

		const inject = ["slots", "theme", "sessions", "workspaces", "locale"];

		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
