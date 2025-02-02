import { StaticSite, StackContext } from 'sst/constructs';

export function Web({ stack, app }: StackContext) {
  const { stage } = app;
  if (stage === 'dev') {
    return;
  }

  const site = new StaticSite(stack, 'admin-panel', {
    path: 'apps/web',
    buildCommand: `yarn run build`,
    buildOutput: 'dist',
  });

  stack.addOutputs({
    SITE: site.url || '',
  });

  return site;
}
