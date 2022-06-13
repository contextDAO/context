export type ProposalStatus = "proposal" | "abandoned" | "approved";
export type UserRole = "user" | "contributor" | "editor";

interface Contributor {
  address: string;
  role: UserRole;
}

export interface Field {
  name: string;
  description: string;
  type: string;
  required?: boolean;
  array?: boolean; 
}

export interface Proposal {
  name: string;
  proposer: string;
  versionId: number;
  field?: Field;
  createdDate: number;
  updatedDate?: number;
  status: ProposalStatus;
}

export interface Release {
  fields: Field[];
}

export interface SchemaState {
  title: string;
  releaseId: number;
  contributors: Contributor[];
  proposals: Proposal[];
  releases: Release[];
}

export interface SchemaAction {
  input: SchemaInput;
  caller: string;
}

export interface SchemaInput {
  function: SchemaFunction;
}

export type SchemaFunction =
  | "addContributor"
  | "getContributors"
  | "addProposal"
  | "updateProposal"
  | "setRole";

export type SchemaResult = { state: SchemaState };
