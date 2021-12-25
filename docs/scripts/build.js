const path = require('path');
const esbuild = require('esbuild');
const sveltePlugin = require('esbuild-svelte');

const buildOption = {
  entryPoints: [path.resolve(__dirname, '../src/index.ts')],
  bundle: true,
  outfile: path.resolve(__dirname, '../dist/out.js'),
  plugins: [sveltePlugin()],
  logLevel: 'info',
  define: {
    process: '{"env":{}}',
    Buffer: '{}',
  },
};

if (process.env.NODE_ENV === 'development') {
  esbuild
    .serve(
      {
        port: 3000,
        servedir: path.resolve(__dirname, '../dist'),
      },
      buildOption
    )
    .catch(() => process.exit(1));
  return;
}

esbuild.build({ ...buildOption }).catch(() => process.exit(1));
