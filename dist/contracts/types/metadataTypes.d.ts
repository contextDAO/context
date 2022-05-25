export interface MetadataSchemaState {
    title: string;
    description: string;
}
export interface PstAction {
    input: PstInput;
    caller: string;
}
export interface PstInput {
    function: PstFunction;
    target: string;
    qty: number;
}
export declare type PstFunction = 'addToken' | 'updateToken' | 'getToken';
export declare type ContractResult = {
    state: MetadataSchemaState;
};
