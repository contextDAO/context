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

export type PstFunction = "addToken" | "updateToken" | "getToken";

export type MetadataResult = { state: MetadataState };
