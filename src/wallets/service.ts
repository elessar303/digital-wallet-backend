import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { ExchangeRate, Wallet } from '../graphql/schema';
import { ExchangeRateDto } from './dto/exchange-rate.dto';
import { SaveWalletDto } from './dto/save-wallet.dto';
import { isDateOneYearOld } from './utils';

@Injectable()
export class WalletService {
  constructor(
    @Inject('WALLET_MODEL')
    private walletModel: Model<Wallet>,
    @Inject('EXCHANGE_MODEL')
    private exchageModel: Model<ExchangeRate>,
    private readonly httpService: HttpService,
  ) {}

  async getWallets(): Promise<Wallet[]> {
    const wallets = await this.walletModel.find().exec();
    return wallets;
  }

  async getRates(): Promise<ExchangeRate[]> {
    const rates = await this.exchageModel.find().exec();
    return rates;
  }

  async getWalletDetailAndSave(
    address: string,
  ): Promise<AxiosResponse<any[], any>> {
    const { data: walletDetail } = await firstValueFrom(
      this.httpService.get('/', {
        params: {
          module: 'account',
          action: 'balance',
          address,
          tag: 'latest',
        },
      }),
    );

    const firstTransacctionTime: Date = new Date(
      (await this.walletFirstTransaction(address)) * 1000,
    );

    const result = {
      ...walletDetail,
      ethBalance: parseInt(walletDetail.result) / 1000000000000000000,
      firstTransacctionTime: firstTransacctionTime.toLocaleString(),
      isOld: isDateOneYearOld(firstTransacctionTime),
    };
    const walletDto: SaveWalletDto = {
      address,
      ethBalance: result.ethBalance,
      firstTransacctionTime: result.firstTransacctionTime,
      isOld: result.isOld,
    };
    this.saveWalletDto(walletDto);
    return result;
  }

  async walletFirstTransaction(address: string): Promise<number> {
    const { data } = await firstValueFrom(
      this.httpService.get('/', {
        params: {
          module: 'account',
          action: 'txlist',
          address,
          startblock: 1,
          endblock: 99999999,
          page: 1,
          offset: 1,
          sort: 'asc',
        },
      }),
    );
    return data.result.length > 0 ? Number(data.result[0].timeStamp) : 0;
  }

  async saveWalletDto(walletDto: SaveWalletDto): Promise<Wallet> {
    const createdWallet = this.walletModel.findOneAndUpdate(
      { address: walletDto.address },
      walletDto,
      { upsert: true, new: true },
    );
    return createdWallet;
  }

  async updateRateDto(rateDto: ExchangeRateDto): Promise<any> {
    const updateRateResult = this.exchageModel.findOneAndUpdate(
      { currency: rateDto.currency },
      rateDto,
      { new: true },
    );
    return updateRateResult;
  }
}
