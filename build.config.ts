import { defineBuildConfig } from 'unbuild';

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
});