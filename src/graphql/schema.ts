
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class SaveWalletInput {
    address?: Nullable<string>;
    firstTransacctionTime?: Nullable<string>;
    isOld?: Nullable<boolean>;
    ethBalance?: Nullable<number>;
}

export class ExchageRateInput {
    currency?: Nullable<string>;
    rate?: Nullable<number>;
}

export abstract class IQuery {
    abstract wallets(): Nullable<Nullable<Wallet>[]> | Promise<Nullable<Nullable<Wallet>[]>>;

    abstract rates(): Nullable<Nullable<ExchangeRate>[]> | Promise<Nullable<Nullable<ExchangeRate>[]>>;
}

export abstract class IMutation {
    abstract saveWallet(saveWalletInput?: Nullable<SaveWalletInput>): Nullable<Wallet> | Promise<Nullable<Wallet>>;

    abstract updateExchange(exchageRateInput?: Nullable<ExchageRateInput>): Nullable<ExchangeRate> | Promise<Nullable<ExchangeRate>>;

    abstract createWallet(address?: Nullable<string>): Nullable<WalletDetail> | Promise<Nullable<WalletDetail>>;
}

export class Wallet {
    address?: Nullable<string>;
    firstTransacctionTime?: Nullable<string>;
    isOld?: Nullable<boolean>;
    ethBalance?: Nullable<number>;
}

export class WalletDetail {
    status?: Nullable<string>;
    message?: Nullable<string>;
    result?: Nullable<string>;
    ethBalance?: Nullable<number>;
    firstTransacctionTime?: Nullable<string>;
    isOld?: Nullable<boolean>;
}

export class ExchangeRate {
    currency?: Nullable<string>;
    rate?: Nullable<number>;
}

type Nullable<T> = T | null;
