export interface StandardFrom {
  standardId: string;
  version: number;
}

interface Contributor {
  address: string;
  role: "user" | "contributor" | "editor";
}

export interface Comment {
  text: string;
  by: string;
}

export type FieldType = "string" | "integer" | "number" | "boolean"

export interface Field {
  name: string;
  description: string;
  type: FieldType;
  minimum?: number;
  maximum?: number;
  enum?: Array<string>;
  readOnly?: boolean;
  required?: boolean;
}

export type ProposalStatus = "proposal" | "open" | "abandoned" | "approved";
export interface Proposal {
  name: string;
  proposer: string;
  versionId: number;
  field?: Field;
  comments: Comment[];
  status: ProposalStatus;
}

export interface Version {
  proposalId: number;
  version: string;
  fields: Field[];
}

export interface UniteSchemaState {
  title: string;
  description: string;
  from: StandardFrom;
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

export interface PstAction {
  input: PstInput;
  caller: string;
}

export interface PstInput {
  function: PstFunction;
  target: string;
  qty: number;
}

export type PstFunction =
  | "addContributor"
  | "getContributors"
  | "addProposal"
  | "addComment"
  | "setRole"
  | "updateProposal"
  | "getSchema";

export type ContractResult = { state: UniteSchemaState } | { result: Field };
