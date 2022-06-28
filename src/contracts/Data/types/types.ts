export interface DataState {
  owner: string;
  id: string;
  schema: string;
  release: number;
  metadata: any;
}

export interface DataAction {
  input: DataInput;
  caller: string;
}

export interface DataInput {
  function: DataFunction;
}

export type DataFunction = "addItem" | "set" | "get";

export type DataResult = { state: DataState };
