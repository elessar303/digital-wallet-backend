import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { walletsProviders } from './provider';
import { WalletResolver } from './resolver';
import { WalletService } from './service';

@Module({
  imports: [
    DatabaseModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      baseURL: 'https://api.etherscan.io/api',
      params: {
        apikey: 'NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY',
      },
    }),
  ],
  providers: [WalletService, WalletResolver, ...walletsProviders],
})
export class WalletsModule {}
