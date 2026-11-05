# openchamber-shortcuts

OpenChamber 快捷按钮扩展：把常用命令/代码片段一键提交到当前会话。

## 功能

- 预置 `/news` `/ci` `/cd` `/tag`，点即通过 `host.prompt({ send: true })` 发到当前会话
- 无会话/会话忙时自动回落填入输入框
- 自加按钮（名称+内容，最多 30 个），存在扩展存储里，随服务端走，删扩展即清

## 安装

设置 → 扩展 → 添加文件夹：

```text
/home/liaoz/code/openchamber-shortcuts
```

批准 `prompt` 能力，点 rail 上「快捷命令」图标。

## 发版

改完 `bun run build`，升 `package.json` version，提交 built 文件。
