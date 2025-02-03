/// <reference path="./.sst/platform/config.d.ts" />

const envs = {
  database: {
    host: 'localhost',
    port: 5432,
    username: 'anasmassnaoui',
    password: '',
    database: 'anasmassnaoui',
  }
}

export default $config({
  app(input) {
    return {
      name: "E-commerceProductManagementPlatform",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    // initiate vpc
    const vpc = new sst.aws.Vpc("vpc", { nat: 'ec2', bastion: true });
    // initiate database
    const database = new sst.aws.Postgres("database", {
      vpc,
      dev: envs.database,
    });
    // initiate ApiGatewayV1
    const api = new sst.aws.ApiGatewayV1("api");
    // initiate lambda function
    api.route("ANY /{proxy+}", {
      bundle: '.',
      handler: "apps/api/bundle/lambda.handler",
      runtime: 'nodejs22.x',
      url: true,
      environment: {
        DB_HOST: database.host,
        DB_PORT: database.port.apply(v => `${v}`),
        DB_USERNAME: database.username,
        DB_PASSWORD: database.password,
        DB_NAME: database.database,
      },
      vpc,
      link: [database],
    });
    api.deploy()
    // initiate StaticSite
    const web = new sst.aws.StaticSite("web", {
      path: "apps/web",
      build: {
        command: "yarn run build",
        output: "dist",
      },
      indexPage: 'index.html',
      errorPage: '404.html',
      environment: {
        NEXT_PUBLIC_GRAPH_QL_URL: api.url.apply(v => `${v}graphql`)
      }
    });
    return {
      site: $app.stage === 'dev' ? 'http://localhost:3001' : web.url,
      api: api.url,
    }
  },
});
