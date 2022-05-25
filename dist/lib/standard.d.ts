import { JWKInterface } from 'arweave/node/lib/wallet';
import { UniteSchemaState } from '../contracts/types/standardTypes';
import { Contract } from 'redstone-smartweave';
declare type Role = 'user' | 'contributor' | 'editor';
declare type FieldType = 'text' | 'number' | 'boolean';
declare type ProposalStatus = 'proposal' | 'open' | 'approved' | 'abandoned';
declare type UpdateVersion = '' | 'major' | 'minor' | 'patch';
export default class Standard {
    wallet: JWKInterface;
    contract: Contract;
    contractAddr: string;
    /**
     * @constructor
     *
     * @param {JWKInterface} wallet - Connected wallet
     * @param {Contract} contract - Interface to the contract
     */
    constructor(wallet: JWKInterface, contract: Contract, contractAddr: string);
    /**
     * readState
     *
     * @returns {UniteSchemaState}
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
     */
    addProposal(proposalName: string, comment: string, name: string, description: string, type: FieldType): Promise<void>;
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
     */
    updateProposal(proposalId: number, status: ProposalStatus, update?: UpdateVersion): Promise<void>;
    getSchema(): Promise<any>;
}
export {};
