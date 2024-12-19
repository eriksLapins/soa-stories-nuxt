import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  failOnWarn: false,
  externals: [
    'esbuild',
    'pnpapi',
    'acorn'
  ],
});