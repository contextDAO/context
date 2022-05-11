interface Contributor {
  address: string,
  role: 'user' | 'contributor' | 'editor'
}

export interface Comment {
  text: string,
  by: string
}

export interface Field {
  name: string,
  description: string,
  type: string,
  min: number,
  max: number,
  proposer: string,
  order: number
}

export interface Version {
  proposer: string;
  name: string;
  status: 'proposal' | 'open' | 'abandoned' | 'approved';
  fields: Field[];
  version: string;
}

export interface UniteSchemaState {
  contributorId: number;
  versionId: number;
  major: number;
  minor: number;
  patch: number;
  currentVersion: number;
  openVersion: number;
  comments: Comment[];
  contributors: Contributor[];
  versions: Version[];
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

export type PstFunction = 'addContributor' | 'getContributors' | 'getField' | 'addField' | 'editField' | 'addComment';

export type ContractResult = { state: UniteSchemaState } | { result: Field};
