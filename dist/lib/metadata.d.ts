import { JWKInterface } from "arweave/node/lib/wallet";
import { DataState } from "../contracts/Data/types/types";
import { Contract } from "redstone-smartweave";
/**
 * Class Data - interactions with the metadata contract.
 */
export default class Data {
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
     * @return {DataState}
     */
    readState(): Promise<DataState>;
    /**
     * connect
     *
     * @param {JWKInterface} wallet - Connected wallet
     */
    connect(wallet: JWKInterface): Promise<void>;
    /**
     * set - Sets the Value for a Field
     *
     * @param {string} field
     * @param {any} value
     */
    set(field: string, value: any): Promise<void>;
    /**
     * set - Sets the Value for a Field
     *
     * @param {string} field
     * @param {any} item
     * @param {number} id
     */
    addItem(field: string, item: any, id: number): Promise<void>;
    /**
     * get - Get the Value of a Field
     *
     * @param {string} field
     * @param {number | null} id
     * @return {any}
     */
    get(field: string, id?: number | null): Promise<any>;
}
