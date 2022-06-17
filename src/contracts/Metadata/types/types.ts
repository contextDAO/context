export interface MetadataState {
  owner: string;
  id: string;
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

export type MetadataFunction = "addItem" | "set" | "get";

export type MetadataResult = { state: MetadataState };
