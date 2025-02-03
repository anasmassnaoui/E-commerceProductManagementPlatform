import esbuild from 'esbuild';
import esbuildPluginTsc from 'esbuild-plugin-tsc';

esbuild.build({
  entryPoints: ['src/lambda.ts'],
  bundle: true,
  outfile: 'bundle/lambda.js',
  platform: 'node',
  plugins: [esbuildPluginTsc({})],
});
