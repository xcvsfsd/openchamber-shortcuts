# openchamber-shortcuts

OpenChamber 快捷按钮扩展：把配置里的常用命令和代码片段一键提交到当前会话。

## 按钮来源（插件只读不管理）

仓库 `.openchamber/project.json` 的 `draftStarters`：

```json
{ "version": 1, "draftStarters": [{ "type": "command", "name": "news" }] }
```

- 去 设置→项目→起草器 里增删，可移入仓库，改完面板自动读到
- 本仓没有就显示兜底 `/news /ci /cd /tag`
- 另有一个内置代码片段按钮「分支⇄Tag对比」：让 agent 对比当前分支与最新 tag 的提交和文件差异并总结

## 安装

设置 → 扩展 → 添加文件夹：

```text
/home/liaoz/code/openchamber-shortcuts
```

批准 `prompt` + `files`（读本仓配置文件）能力。Work Status 节列表里打开「快捷命令」拖到 Git 下面。

## 发版

改完 `bun run build`，升 `package.json` version，提交 built 文件。
