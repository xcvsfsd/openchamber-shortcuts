// 单文件 IIFE：OpenChamber 装扩展不构建，status/main.js 必须提交。
// index.html 也是构建产物：写入版本查询串防浏览器缓存旧 main.js。
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// 构建目标：入口 ts → 输出 js + 防缓存 html
const TARGETS = [
  { entry: 'src/status/main.ts', out: 'status/main.js', html: 'status/index.html' },
] as const;

const pkg = JSON.parse(await Bun.file(resolve('package.json')).text()) as { version?: string };
const stamp = `${pkg.version ?? '0.0.0'}-${Date.now().toString(36)}`;
for (const target of TARGETS) {
  const result = await Bun.build({
    entrypoints: [resolve(target.entry)],
    format: 'iife',
    target: 'browser',
    minify: true,
  });
  const artifact = result.outputs[0];
  if (!result.success || !artifact) {
    console.error(result.logs.map((log) => log.message).join('\n') || `Build failed: ${target.entry}`);
    process.exit(1);
  }
  await writeFile(resolve(target.out), await artifact.text());
  console.log(`${target.out}  ${(artifact.size / 1024).toFixed(1)} KB`);
  await writeFile(
    resolve(target.html),
    '<!doctype html>\n<html>\n  <head>\n    <meta charset="utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <title>快捷命令</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script src="main.js?v=' + stamp + '"></script>\n  </body>\n</html>\n',
  );
}
