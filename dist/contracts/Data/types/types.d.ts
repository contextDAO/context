export interface DataState {
    dataId: string;
    schemaId: string;
    owner: string;
    release: number;
    data: any;
}
export interface DataAction {
    input: DataInput;
    caller: string;
}
export interface DataInput {
    function: DataFunction;
}
export declare type DataFunction = "addItem" | "write" | "read";
export declare type DataResult = {
    state: DataState;
};
