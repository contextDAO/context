import Arweave from "arweave";
import { Contract, SmartWeave } from "redstone-smartweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { UniteState } from "../contracts/Unite/types/types";
import { SchemaState, Field, ProposalStatus } from "../contracts/Schema/types/types";
import Metadata from "./metadata";
declare type Network = "localhost" | "testnet" | "mainnet";
/**
 * @class Unite
 */
export default class Unite {
    network: Network;
    arweave: Arweave;
    smartweave: SmartWeave;
    uniteAddr: string;
    /**
     * @Constructor
     * @param {Network} network
     * @param {string} uniteAddr
     */
    constructor(network: Network, uniteAddr?: string);
    /**
     * Init Unite Instance
     *
     * @param {Network} network
     * @return {Unite}
     */
    static init(network: Network): Promise<Unite>;
    /**
   * get
   *
   * @return {UniteState}
   */
    get(): Promise<UniteState>;
    /**
     * deployUnite
     *
     * @param {JWKInterface} wallet
     * @return {string}
     */
    deployUnite(wallet: JWKInterface): Promise<string>;
    /**
     * mint
     *
     * @param {JWKInterface} wallet
     * @param {number} qty - Quantity of tokens
     */
    mint(wallet: JWKInterface, qty: number): Promise<void>;
    /**
     * createSchema
     *
     * @param {JWKInterface} wallet
     * @param {string} id - Title of the schema
     * @param {schemaState} state - Initial state
     */
    createSchema(wallet: JWKInterface, id: string, state?: SchemaState): Promise<void>;
    /**
     * getAddress
     *
     * @param {string} id - Schema ID
     * @return {string}
     */
    getAddress(id: string): Promise<string>;
    /**
     * getContract
     *
     * @param {JWKInterface} wallet
     * @param {string} id - Title of the schema
     * @return {Contract}
     */
    getContract(wallet: JWKInterface, id: string): Promise<Contract>;
    /**
     * getSchema
     *
     * @param {string} id
     * @return {SchemaState}
     */
    getSchema(id: string): Promise<SchemaState>;
    /**
     * addContributor
     *
     * @param {JWKInterface} wallet
     * @param {string} id - Title of the schema
     */
    addContributor(wallet: JWKInterface, id: string): Promise<void>;
    /**
     * editContributor
     *
     * @param {JWKInterface} wallet
     * @param {string} id - Title of the schema
     * @param {string} userAddr - Contributor's address
     * @param {string} role
     */
    editContributor(wallet: JWKInterface, id: string, userAddr: string, role: string): Promise<void>;
    /**
     * geDefinition
     *
     * @param {SchemaState} state - State of the schema
     * @return {string}
     */
    getDefinition(state: SchemaState): Promise<string>;
    /**
     * addProposal - new proposal in the standard
     *
     * @param {JWKInterface} wallet
     * @param {string} id - Title of the schema
     * @param {string} proposalName
     * @param {Field} field - Field for the proposal
     */
    addProposal(wallet: JWKInterface, id: string, proposalName: string, field: Field): Promise<void>;
    /**
     * editProposal
     *
     * @param {JWKInterface} wallet
     * @param {string} id - Title of the schema
     * @param {number} proposalId
     * @param {ProposalStatus} status
     */
    editProposal(wallet: JWKInterface, id: string, proposalId: number, status: ProposalStatus): Promise<void>;
    /**
     *addItem
     *
     * @param {JWKInterface} wallet
     * @param {string} id - Title of the schema
     * @param {string} field - Field ID
     * @param {number} itemId - Item ID
     * @param {any} value - Value of the Field
     * @return {Metadata}
     */
    addItem(wallet: JWKInterface, id: string, field: string, itemId: number, value: any): Promise<void>;
    /**
     *set
     *
     * @param {JWKInterface} wallet
     * @param {string} id - Title of the schema
     * @param {string} field - Field ID
     * @param {any} value - Value of the Field
     * @return {Metadata}
     */
    set(wallet: JWKInterface, id: string, field: string, value: any): Promise<void>;
    /**
     * read
     *
     * @param {string} id - Title of the schema
     * @return {Metadata}
     */
    read(id: string): Promise<void>;
    /**
     * write
     *
     * @param {JWKInterface} wallet
     * @param {string} id - Title of the schema
     * @param {string} schemaId - Schema
     * @param {any} data - Schema release
     * @return {Metadata}
     */
    write(wallet: JWKInterface, id: string, schemaId: string, data: any): Promise<Metadata>;
}
export {};
