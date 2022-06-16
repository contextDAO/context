import Arweave from "arweave";
import { SmartWeave } from "redstone-smartweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { RegistryState } from "../contracts/Registry/types/types";
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
    registryAddr: string;
    /**
     * @Constructor
     * @param {Network} network
     * @param {string} registryAddr
     */
    constructor(network: Network, registryAddr?: string);
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
     * getSchema
     *
     * @return {RegistryState}
     */
    get(): Promise<RegistryState>;
    /**
     * geDefinitiont
     *
     * @param {SchemaState} state - State of the schema
     * @return {string}
     */
    getDefinition(state: SchemaState): Promise<string>;
    /**
     * deployRegistry
     *
     * @param {JWKInterface} wallet
     * @return {string}
     */
    deployRegistry(wallet: JWKInterface): Promise<string>;
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
     * @param {string} contractAddr
     * @return {Schema}
     */
    getSchema(contractAddr: string): Promise<Schema>;
    /**
     * deployMetadata
     *
     * @param {JWKInterface} wallet
     * @param {string} title - Title of the schema
     * @param {string} schema - Schema
     * @param {number} release - Schema release
     * @return {Metadata}
     */
    deployMetadata(wallet: JWKInterface, title: string, schema: string, release: number): Promise<Metadata>;
    /**
     * Mine a new block - only localhost
     */
    mine(): Promise<void>;
}
export {};
