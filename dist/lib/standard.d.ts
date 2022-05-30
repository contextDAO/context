import { JWKInterface } from "arweave/node/lib/wallet";
import { UniteSchemaState } from "../contracts/types/standardTypes";
import { Contract } from "redstone-smartweave";
declare type Role = "user" | "contributor" | "editor";
declare type FieldType = "text" | "number" | "boolean";
declare type ProposalStatus = "proposal" | "open" | "approved" | "abandoned";
declare type UpdateVersion = "" | "major" | "minor" | "patch";
/**
 * Class Standard - interactions with the standard contract.
 */
export default class Standard {
    wallet: JWKInterface | null;
    contract: Contract;
    contractAddr: string;
    /**
     * @constructor
     *
     * @param {Contract} contract - Interface to the contract
     * @param {string} contractAddr - Contract Address
     */
    constructor(contract: Contract, contractAddr: string);
    /**
     * readState
     *
     * @return {UniteSchemaState}
     */
    readState(): Promise<UniteSchemaState>;
    /**
     * connect
     *
     * @param {JWKInterface} wallet - Connected wallet
     */
    connect(wallet: JWKInterface): Promise<void>;
    /**
     * register
     *
     * @param {JWKInterface} wallet - Connected wallet
     */
    register(wallet: JWKInterface): Promise<void>;
    /**
     * setRole - Updates the role of an address (wallet must be 'editor')
     *
     * @param {Role} role - can be 'user', 'editor' or 'contributor'
     * @param {string} userAddr - Address to change the role from
     */
    setRole(role: Role, userAddr: string): Promise<void>;
    /**
     * addProposal - new proposal in the standard
     *
     * @param {string} proposalName
     * @param {string} comment
     * @param {string} name - Field Name
     * @param {string} description - Field Description
     * @param {FieldType} type - Field Type
     * @param {boolean} isReadOnly - The field is Read Only
     * @param {boolean} isRequired - The Field is required
     */
    addProposal(proposalName: string, comment: string, name: string, description: string, type: FieldType, isReadOnly: boolean, isRequired: boolean): Promise<void>;
    /**
     * addComment
     *
     * @param {number} proposalId
     * @param {string} text
     */
    addComment(proposalId: number, text: string): Promise<void>;
    /**
     * updateProposal
     *
     * @param {number} proposalId
     * @param {ProposalStatus} status
     * @param {UpdateVersion} update - Can be major, minor or patch.
     */
    updateProposal(proposalId: number, status: ProposalStatus, update?: UpdateVersion): Promise<void>;
    /**
     * getSchema
     *
     * @return {any}
     */
    getSchema(): Promise<any>;
}
export {};
