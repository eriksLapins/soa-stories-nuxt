import { defineBuildConfig } from 'unbuild';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

export default defineBuildConfig({
  failOnWarn: false,
  externals: [
    'esbuild',
    'pnpapi',
    'acorn'
  ],
  entries: [
    './src/module.ts',
    {
      builder: 'mkdist',
      input: './src/runtime',
      outDir: './dist/runtime'
    },
    {
      builder: 'mkdist',
      input: './src/types',
      outDir: './dist/types'
    }
  ],
  declaration: true,
  hooks: {
    "build:done": () => {
      if (existsSync('./dist/runtime/assets/css/soa-tw.css')) {
        const file = readFileSync('./src/runtime/assets/css/soa-tw.css', {
          encoding: 'utf-8'
        });
        writeFileSync('./dist/runtime/assets/css/soa-tw.css', file.replaceAll('--tw-', '--soa-tw-'), {
          encoding: 'utf-8'
        });
      }
    },
  }
});