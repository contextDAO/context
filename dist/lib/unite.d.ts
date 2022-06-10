import Arweave from "arweave";
import { SmartWeave } from "redstone-smartweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import Schema from "./schema";
import Metadata from "./metadata";
declare type Network = "localhost" | "testnet" | "mainnet";
/**
 * @class Unite
 */
export default class Unite {
    network: Network;
    arweave: Arweave;
    smartweave: SmartWeave;
    /**
     * @Constructor
     * @param {Network} network
     */
    constructor(network: Network);
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
     * @param {string} contractAddr
     * @return {Schema}
     */
    getSchema(contractAddr: string): Promise<Schema>;
    /**
     * deploySchema
     *
     * @param {JWKInterface} wallet
     * @param {string} title - Title of the schema
     * @param {string} description - Full description
     * @return {Schema}
     */
    deploySchema(wallet: JWKInterface, title: string, description: string): Promise<Schema>;
    /**
     * deployMetadata
     *
     * @param {JWKInterface} wallet
     * @param {string} title - Title of the schema
     * @param {string} description - Full description
     * @return {Metadata}
     */
    deployMetadata(wallet: JWKInterface, title: string, description: string): Promise<Metadata>;
    /**
     * Mine a new block - only localhost
     */
    mine(): Promise<void>;
}
export {};
