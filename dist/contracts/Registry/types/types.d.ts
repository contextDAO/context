export interface RegistryAction {
    input: RegistryInput;
    caller: string;
}
export interface RegistryInput {
    function: RegistryFunction;
    target: string;
    qty: number;
}
export interface PstResult {
    target: string;
    ticker: string;
    balance: number;
}
export interface RegistryState {
    ticker: string;
    name: string;
    owner: string;
    balances: {
        [address: string]: number;
    };
}
export declare type RegistryFunction = 'transfer' | 'mint' | 'balance' | 'register';
export declare type RegistryResult = {
    state: RegistryState;
} | {
    result: PstResult;
};