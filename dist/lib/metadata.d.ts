import { JWKInterface } from 'arweave/node/lib/wallet';
import { MetadataSchemaState } from '../contracts/types/metadataTypes';
import { Contract } from 'redstone-smartweave';
export default class Metadata {
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
     * @returns {MetadataSchemaState}
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
