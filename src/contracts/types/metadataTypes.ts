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

export type PstFunction = 'addToken' | 'updateToken' | 'getToken';

export type ContractResult = { state: MetadataSchemaState };
