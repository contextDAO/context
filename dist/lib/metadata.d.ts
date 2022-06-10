import { JWKInterface } from "arweave/node/lib/wallet";
import { MetadataState } from "../contracts/Metadata/types/types";
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
     * @return {MetadataState}
     */
    readState(): Promise<MetadataState>;
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
