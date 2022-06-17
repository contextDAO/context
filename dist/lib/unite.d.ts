import Arweave from "arweave";
import { SmartWeave } from "redstone-smartweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { UniteState } from "../contracts/Unite/types/types";
import Schema from "./schema";
import { SchemaState } from "../contracts/Schema/types/types";
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
     * Stop arlocal
     */
    stop(): void;
    /**
     * getAddress
     *
     * @param {JWKInterface} wallet
     * @return {string}
     */
    getAddress(wallet: JWKInterface): Promise<string>;
    /**
     * getBalance for a wallet
     *
     * @param {string | JWKInterface} wallet
     */
    getBalance(wallet: string | JWKInterface): Promise<number>;
    /**
     * get
     *
     * @return {UniteState}
     */
    get(): Promise<UniteState>;
    /**
     * geDefinitiont
     *
     * @param {SchemaState} state - State of the schema
     * @return {string}
     */
    getDefinition(state: SchemaState): Promise<string>;
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
     * registerSchema
     *
     * @param {JWKInterface} wallet
     * @param {string} id - Name (ID) of the schema
     * @param {string} address - Adress where the Schema has been deployed.
     */
    registerSchema(wallet: JWKInterface, id: string, address: string): Promise<void>;
    /**
     * deploySchema
     *
     * @param {JWKInterface} wallet
     * @param {string} title - Title of the schema
     * @param {schemaState} state - Initial state
     * @return {Schema}
     */
    deploySchema(wallet: JWKInterface, title: string, state?: SchemaState): Promise<Schema>;
    /**
     * getSchema
     *
     * @param {string} id
     * @return {Schema}
     */
    getSchema(id: string): Promise<Schema>;
    /**
     * getSchema
     *
     * @param {string} contractAddr
     * @return {Schema}
     */
    getSchemaByAddr(contractAddr: string): Promise<Schema>;
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
    /**
     * Mine a new block - only localhost
     */
    mine(): Promise<void>;
}
export {};
