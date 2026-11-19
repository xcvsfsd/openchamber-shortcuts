# openchamber-shortcuts

Custom shortcut buttons for OpenChamber: one click sends a frequently used command/snippet to the current session. Status section only, no rail panel. Chinese interface.

OpenChamber 快捷按钮：点即把常用命令/片段提交到当前会话。按钮只显示描述，不显示英文名。只有工作状态分区，没有独立大面板。

## 分区标题栏

- `↻`：重读片段与命令配置，重绘后结果行给回执（`已重读：N 个快捷`）
- 老宿主不支持标题栏控件时，退回分区内的「↻ 重读配置」按钮
- 内容区末尾显示 `上次刷新 HH:MM:SS`（与 Git 分区同样式），操作回执在它下方
- 每个快捷为单个按钮：点按底部胶囊开关提交会话
- 底部 `自动发送` 胶囊开关：开=点即 `send:true` 自动发送；关=只 `prompt({text})` 填入输入框。`localStorage` 持久化，默认开

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

## 说明

- `openchamber.contributes.panel` 保留 `id`/`name`/`icon`，省略 `entry`：扩展只有状态区、没有 rail 面板。整块删掉会让宿主解析 manifest 失败（`missing-panel`），扩展会从列表消失。
- 状态区每 30 秒自动重读一次片段/命令，切项目时立即重读。

## License

MIT

## 发版

改完 `bun run build`，升 `package.json` version，提交 built 文件。
