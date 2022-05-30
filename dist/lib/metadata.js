"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class Metadata - interactions with the metadata contract.
 */
class Metadata {
    /**
     * @constructor
     *
     * @param {JWKInterface} wallet - Connected wallet
     * @param {Contract} contract - Interface to the contract
     * @param {string} contractAddr - Contract Address
     */
    constructor(wallet, contract, contractAddr) {
        this.wallet = wallet;
        this.contract = contract;
        this.contractAddr = contractAddr;
    }
    /**
     * readState
     *
     * @return {MetadataSchemaState}
     */
    async readState() {
        const initialState = await this.contract.readState();
        const state = initialState.state;
        return state;
    }
    /**
     * connect
     *
     * @param {JWKInterface} wallet - Connected wallet
     */
    async connect(wallet) {
        this.wallet = wallet;
        this.contract.connect(wallet);
    }
    /**
     * register
     *
     * @param {JWKInterface} wallet - Connected wallet
     */
    async register(wallet) {
        await this.connect(wallet);
        await this.contract.writeInteraction({ function: "addContributor" });
    }
}
exports.default = Metadata;
