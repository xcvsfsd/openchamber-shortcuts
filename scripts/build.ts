// 单文件 IIFE：OpenChamber 装扩展不构建，panel/main.js 必须提交。
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const result = await Bun.build({
  entrypoints: [resolve('src/panel/main.ts')],
  format: 'iife',
  target: 'browser',
  minify: true,
});
const artifact = result.outputs[0];
if (!result.success || !artifact) {
  console.error(result.logs.map((log) => log.message).join('\n') || 'Build failed');
  process.exit(1);
}
await writeFile(resolve('panel/main.js'), await artifact.text());
console.log(`panel/main.js  ${(artifact.size / 1024).toFixed(1)} KB`);
