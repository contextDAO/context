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
  type: 'text' | 'number' | 'boolean' | 'select', 
  min?: number,
  max?: number,
  values?: [string]
}

export interface Proposal {
  name: string;
  proposer: string;
  status: 'add' | 'edit' | 'open' | 'abandoned' | 'approved';
  version: string;
  prevProposalId: number;
  field?: Field;
  comments: Comment[];
}

export interface UniteSchemaState {
  contributorId: number;
  proposalId: number;
  lastProposal: number;
  openProposal: number;
  major: number;
  minor: number;
  patch: number;
  contributors: Contributor[];
  proposals: Proposal[];
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

export type PstFunction = 'addContributor' | 'getContributors' | 'addField' | 'addComment' | 'setRole' | 'setStatus';

export type ContractResult = { state: UniteSchemaState } | { result: Field};
