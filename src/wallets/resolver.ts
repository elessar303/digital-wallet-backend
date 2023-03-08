import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExchangeRate, Wallet } from 'src/graphql/schema';
import { ExchangeRateDto } from './dto/exchange-rate.dto';
import { SaveWalletDto } from './dto/save-wallet.dto';
import { WalletService } from './service';

@Resolver('Wallet')
export class WalletResolver {
  constructor(private readonly walletService: WalletService) {}

  @Query('wallets')
  async getWallets() {
    return this.walletService.getWallets();
  }

  @Query('rates')
  async geRates() {
    return this.walletService.getRates();
  }

  @Mutation('createWallet')
  async getWalletDetail(@Args('address') address: string) {
    return this.walletService.getWalletDetailAndSave(address);
  }

  @Mutation('saveWallet')
  async createWallet(
    @Args('saveWalletInput') args: SaveWalletDto,
  ): Promise<Wallet> {
    return this.walletService.saveWalletDto(args);
  }

  @Mutation('updateExchange')
  async updateRate(
    @Args('exchageRateInput') args: ExchangeRateDto,
  ): Promise<ExchangeRate> {
    return this.walletService.updateRateDto(args);
  }
}
