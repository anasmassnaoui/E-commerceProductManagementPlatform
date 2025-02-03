import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Modules } from './modules';

const AWS_LAMBDA = (process.env as any).AWS_LAMBDA_FUNCTION_NAME;

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(
        process.cwd(),
        AWS_LAMBDA ? 'apps/api/src/schema.gql' : 'src/schema.gql',
      ),
      driver: ApolloDriver,
      context: ({ req }) => ({ req }),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      }),
    }),
    Modules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
