export interface RegistryAction {
    input: RegistryInput;
    caller: string;
}
export interface RegistryInput {
    function: RegistryFunction;
    target?: string;
    qty?: number;
}
export interface PstResult {
    target: string;
    ticker: string;
    balance: number;
}
export interface RegistrySchema {
    id: string;
    address: string;
}
export interface RegistryName {
    id: string;
    schema: string;
    address: string;
    names: RegistryName[];
}
export interface RegistryState {
    ticker: string;
    name: string;
    owner: string;
    balances: {
        [address: string]: number;
    };
    schemas: RegistrySchema[];
    names: RegistryName[];
}
export declare type RegistryFunction = 'transfer' | 'mint' | 'balance' | 'register' | 'registerSchema';
export declare type RegistryResult = {
    state: RegistryState;
} | {
    result: PstResult;
};
