export interface MetadataState {
    owner: string;
    title: string;
    schema: string;
    release: number;
    metadata: any;
}
export interface MetadataAction {
    input: MetadataInput;
    caller: string;
}
export interface MetadataInput {
    function: MetadataFunction;
}
export declare type MetadataFunction = "addItem" | "set" | "get";
export declare type MetadataResult = {
    state: MetadataState;
};
