import esbuild from 'esbuild';
import esbuildPluginTsc from 'esbuild-plugin-tsc';

esbuild.build({
  entryPoints: ['src/lambda.ts'],
  bundle: true,
  outfile: 'build/lambda.js',
  platform: 'node',
  plugins: [esbuildPluginTsc({})],
});
