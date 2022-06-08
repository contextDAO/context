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
export declare type FieldType = "string" | "integer" | "number" | "boolean";
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
export declare type ProposalStatus = "proposal" | "open" | "abandoned" | "approved";
export interface Proposal {
    name: string;
    proposer: string;
    versionId: number;
    field?: Field;
    comments: Comment[];
    createdDate: number;
    openDate: number;
    abandonedDate: number;
    approvedDate: number;
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
export declare type PstFunction = "addContributor" | "getContributors" | "addProposal" | "addComment" | "setRole" | "updateProposal" | "getSchema";
export declare type ContractResult = {
    state: UniteSchemaState;
} | {
    result: Field;
};
export {};
