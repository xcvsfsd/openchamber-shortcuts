# openchamber-shortcuts

Custom shortcut buttons for OpenChamber: one click sends a frequently used command/snippet to the current session. Chinese interface.

OpenChamber 快捷按钮：点即把常用命令/片段提交到当前会话。按钮只显示描述，不显示英文名。

## 按钮来源（插件只读不管理）

1. 片段库 `~/.config/opencode/snippet/*.md`：按钮发正文，显示 frontmatter `description`（如 ci→对比并tag）
2. opencode 自定义命令：全局 `~/.config/opencode/command|commands/*.md` + 项目下 `command|commands|.opencode/*`：显示 `description`，发 `/name`
3. 本仓 `.openchamber/project.json` 的 `draftStarters`：能对上描述就显示否则显示名，发 `/name`

管理去各自位置：片段/命令改 md 文件，起草器去设置→项目（可移入仓库）。全都没有就显示提示。

## 安装

设置 → 扩展 → 粘贴 Git 地址添加：

```text
https://github.com/xcvsfsd/openchamber-shortcuts
```

本地开发可用文件夹路径安装（`/home/liaoz/code/openchamber-shortcuts`）

批准 `prompt` + `files` + `filesystem`（读片段与配置）能力。Work Status 节列表里打开「快捷命令」拖到 Git 下面。

## License

MIT

## 发版

改完 `bun run build`，升 `package.json` version，提交 built 文件。
