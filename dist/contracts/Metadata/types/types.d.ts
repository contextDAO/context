export interface MetadataState {
    title: string;
    description: string;
}
export interface MetadataAction {
    input: MetadataInput;
    caller: string;
}
export interface MetadataInput {
    function: PstFunction;
}
export declare type PstFunction = "addToken" | "updateToken" | "getToken";
export declare type MetadataResult = {
    state: MetadataState;
};
