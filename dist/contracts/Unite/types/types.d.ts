export interface UniteAction {
    input: UniteInput;
    caller: string;
}
export interface UniteInput {
    function: UniteFunction;
    target?: string;
    qty?: number;
}
export interface PstResult {
    target: string;
    ticker: string;
    balance: number;
}
export interface SchemaResult {
    schema: UniteSchema;
}
export interface UniteSchema {
    id: string;
    address: string;
    schemas?: UniteSchema[];
}
export interface UniteName {
    id: string;
    schema: string;
    address: string;
    names?: UniteName[];
}
export interface UniteState {
    ticker: string;
    name: string;
    owner: string;
    balances: {
        [address: string]: number;
    };
    schemas: UniteSchema[];
    names: UniteName[];
}
export declare type UniteFunction = 'transfer' | 'mint' | 'balance' | 'register' | 'registerSchema' | 'getSchema';
export declare type UniteResult = {
    state: UniteState;
} | {
    result: PstResult;
} | {
    result: SchemaResult;
};
