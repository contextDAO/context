import { JWKInterface } from "arweave/node/lib/wallet";
import { MetadataSchemaState } from "../contracts/types/metadataTypes";
import { Contract } from "redstone-smartweave";
/**
 * Class Metadata - interactions with the metadata contract.
 */
export default class Metadata {
    wallet: JWKInterface;
    contract: Contract;
    contractAddr: string;
    /**
     * @constructor
     *
     * @param {JWKInterface} wallet - Connected wallet
     * @param {Contract} contract - Interface to the contract
     * @param {string} contractAddr - Contract Address
     */
    constructor(wallet: JWKInterface, contract: Contract, contractAddr: string);
    /**
     * readState
     *
     * @return {MetadataSchemaState}
     */
    readState(): Promise<MetadataSchemaState>;
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
}
