import { JWKInterface } from "arweave/node/lib/wallet";
import { SchemaState, Field, UserRole, ProposalStatus } from "../contracts/Schema/types/types";
import { Contract } from "redstone-smartweave";
/**
 * Class Schema - interactions with the standard contract.
 */
export default class Schema {
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
     * @return {SchemaState}
     */
    readState(): Promise<SchemaState>;
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
    setRole(role: UserRole, userAddr: string): Promise<void>;
    /**
     * addProposal - new proposal in the standard
     *
     * @param {string} proposalName
     * @param {Field} field - Field for the proposal
     */
    addProposal(proposalName: string, field: Field): Promise<void>;
    /**
     * updateProposal
     *
     * @param {number} proposalId
     * @param {ProposalStatus} status
     * @param {UpdateVersion} update - Can be major, minor or patch.
     */
    updateProposal(proposalId: number, status: ProposalStatus): Promise<void>;
}
