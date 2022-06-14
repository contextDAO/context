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
     * @return {MetadataState}
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
     * set - Sets the Value for a Field
     *
     * @param {string} field
     * @param {any} value
     */
    async set(field, value) {
        const interaction = {
            function: "set",
            field,
            value
        };
        await this.contract.writeInteraction(interaction);
    }
    /**
     * set - Sets the Value for a Field
     *
     * @param {string} field
     * @param {any} item
     * @param {number} id
     */
    async addItem(field, item, id) {
        const interaction = {
            function: "addItem",
            field,
            item,
            id
        };
        await this.contract.writeInteraction(interaction);
    }
    /**
     * get - Get the Value of a Field
     *
     * @param {string} field
     * @param {number | null} id
     * @return {any}
     */
    async get(field, id = null) {
        const interaction = { function: "get", field, id };
        const result = await this.contract.viewState(interaction);
        return result.result.value;
    }
}
exports.default = Metadata;
