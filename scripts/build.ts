// 单文件 IIFE：OpenChamber 装扩展不构建，panel/main.js 必须提交。
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

for (const target of [
  { entry: 'src/panel/main.ts', out: 'panel/main.js' },
  { entry: 'src/status/main.ts', out: 'status/main.js' },
]) {
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
}
