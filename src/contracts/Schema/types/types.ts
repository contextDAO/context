interface Contributor {
  address: string;
  role: "user" | "contributor" | "editor";
}

export interface Comment {
  text: string;
  by: string;
}

export interface Field {
  name: string;
  description: string;
  required?: boolean;
  array?: boolean; 
  type: string;
  enum?: Array<string>;
}

export type ProposalStatus = "proposal" | "open" | "abandoned" | "approved";

export interface Proposal {
  name: string;
  proposer: string;
  versionId: number;
  field?: Field;
  comments: Comment[];
  createdDate: number;
  openDate?: number;
  abandonedDate?: number;
  approvedDate?: number;
  status: ProposalStatus;
}

export interface Version {
  proposalId: number;
  version: string;
  fields: Field[];
}

export interface SchemaState {
  title: string;
  description: string;
  contributorId: number;
  proposalId: number;
  versionId: number;
  major: number;
  minor: number;
  patch: number;
  contributors: Contributor[];
  proposals: Proposal[];
  versions: Version[];
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
  | "addComment"
  | "setRole"
  | "updateProposal"
  | "getSchema";

export type SchemaResult = { state: SchemaState };
