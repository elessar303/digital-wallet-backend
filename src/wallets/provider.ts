import { Connection } from 'mongoose';
import { exchangeRatesSchema, WalletSchema } from '../schemas/wallet';

export const walletsProviders = [
  {
    provide: 'WALLET_MODEL',
    useFactory: (connection: Connection) => connection.model('Wallet', WalletSchema, 'wallets'),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'EXCHANGE_MODEL',
    useFactory: (connection: Connection) => connection.model('Rates', exchangeRatesSchema, 'exchangeRates'),
    inject: ['DATABASE_CONNECTION'],
  },
];