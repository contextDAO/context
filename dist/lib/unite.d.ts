import Arweave from "arweave";
import { SmartWeave } from "redstone-smartweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import Standard from "./standard";
import { StandardFrom } from "../contracts/types/standardTypes";
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
     * getStandard
     *
     * @param {string} contractAddr
     * @return {Standard}
     */
    getStandard(contractAddr: string): Promise<Standard>;
    /**
     * deployStandard
     *
     * @param {JWKInterface} wallet
     * @param {string} title - Title of the standard
     * @param {string} description - Full description
     * @param {StandardFrom} standardFrom - Inherits from
     * @return {Standard}
     */
    deployStandard(wallet: JWKInterface, title: string, description: string, standardFrom?: StandardFrom): Promise<Standard>;
    /**
     * deployMetadata
     *
     * @param {JWKInterface} wallet
     * @param {string} title - Title of the standard
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
