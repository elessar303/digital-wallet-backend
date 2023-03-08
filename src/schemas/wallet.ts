import * as mongoose from 'mongoose';

export const WalletSchema = new mongoose.Schema({
  address: String,
  firstTransacctionTime: String,
  isOld: Boolean,
  ethBalance: Number
});

export const exchangeRatesSchema = new mongoose.Schema({
  currency: String,
  rate: Number
});