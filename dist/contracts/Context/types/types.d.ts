export interface ContextAction {
    input: ContextInput;
    caller: string;
}
export interface ContextInput {
    function: ContextFunction;
    target?: string;
    qty?: number;
}
export interface PstResult {
    target: string;
    ticker: string;
    balance: number;
}
export interface SchemaResult {
    schema: ContextSchema;
}
export interface DataResult {
    data: ContextData;
}
export interface ContextSchema {
    schemaId: string;
    address: string;
    schemas?: ContextSchema[];
}
export interface ContextData {
    dataId: string;
    schema: string;
    address: string;
    data?: ContextData[];
}
export interface ContextState {
    canEvolve: boolean;
    ticker: string;
    name: string;
    owner: string;
    balances: {
        [address: string]: number;
    };
    schemas: ContextSchema[];
    data: ContextData[];
}
export declare type ContextFunction = 'transfer' | 'mint' | 'balance' | 'register' | 'registerSchema' | 'getSchema' | 'registerData' | 'getData' | 'evolve' | 'improve';
export declare type ContextResult = {
    state: ContextState;
} | {
    result: PstResult;
} | {
    result: SchemaResult;
} | {
    result: DataResult;
};
