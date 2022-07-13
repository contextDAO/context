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

export type DataPodFunction = "addItem" | "write" | "read";

export type DataPodResult = { state: DataPodState };
