export interface UniteAction {
  input: UniteInput;
  caller: string;
}

export interface UniteInput {
  function: UniteFunction;
  target?: string;
  qty?: number;
}

export interface PstResult {
  target: string;
  ticker: string;
  balance: number;
}

export interface SchemaResult {
  schema: UniteSchema;
}

export interface DataResult {
  data: UniteData;
}

export interface UniteSchema {
  schemaId: string;
  address: string;
  schemas?: UniteSchema[];
}

export interface UniteData{
  dataId: string;
  schema: string;
  address: string;
  data?: UniteData[];
}

export interface UniteState {
  ticker: string;
  name: string;
  owner: string;
  balances: {
    [address: string]: number,
  };
  schemas: UniteSchema[];
  data: UniteData[];
}

export type UniteFunction = 'transfer' | 'mint' | 'balance' | 'register' | 'registerSchema' | 'getSchema' | 'registerData' | 'getData';

export type UniteResult = { state: UniteState } | { result: PstResult } | { result: SchemaResult } | { result: DataResult };
