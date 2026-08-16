# 发布指南 / Publishing Guide

## 手动发布（OTP，适合个人临时发布）

```sh
cd dsh-vscode-theme
npm publish          # 账号开启 2FA 时，按提示输入认证器的 6 位验证码
```

## 自动发布（Trusted Publishing / OIDC，推荐，零密钥）

npm 官方推荐的自动化发布方式：不需要任何长期 token，CI 通过 OIDC 获取短时发布凭证。

### 一次性配置（每个账号/包做一次）

1. 确保包已发布过至少一版（Trusted Publishing 需要包已存在）。
2. 打开 [npmjs.com](https://www.npmjs.com) → 登录你的账号 → **Access Tokens** 页签 → 找到 **Trusted Publishers** 区块 → **Add Publisher**。
3. 填入：
   - **Package name**：`dsh-vscode-theme`
   - **GitHub repository**：`lonebone/dsh-vscode-theme`
   - **Workflow name**：`publish`（对应 `.github/workflows/publish.yml` 的 `name:`）
   - **Environment**：留空（工作流未声明环境时用默认）
4. 保存。

### 发布流程

```sh
git tag v0.1.1
git push origin v0.1.1
```

GitHub Actions 自动运行 `.github/workflows/publish.yml`，`npm publish --provenance` 会通过 OIDC 完成鉴权并发布，同时生成 provenance（供应链来源证明）。

## 版本号约定

- 仓库里的 `package.json` 版本号与发布的 tag 保持同步（`v` 前缀 tag 对应去掉前缀的版本号）。
- 发布前记得：`npm version patch`（或手动改 `package.json` 后提交），再打 tag。
