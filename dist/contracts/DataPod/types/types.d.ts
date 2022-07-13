export interface DataPodState {
    schemaId: string;
    owner: string;
    release: number;
    data: any;
}
export interface DataPodAction {
    input: DataPodInput;
    caller: string;
}
export interface DataPodInput {
    function: DataPodFunction;
}
export declare type DataPodFunction = "addItem" | "write" | "read";
export declare type DataPodResult = {
    state: DataPodState;
};
