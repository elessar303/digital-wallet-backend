import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { upperDirectiveTransformer } from './directives/upper-case.directive';
import { WalletsModule } from './wallets/module';

@Module({
  imports: [
    WalletsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql/schema.ts'),
        outputAs: 'class',
      },
    }),
  ],
})
export class AppModule {}
