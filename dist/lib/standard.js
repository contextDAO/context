"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Class Standard - interactions with the standard contract.
 */
class Standard {
    /**
     * @constructor
     *
     * @param {JWKInterface} wallet - Connected wallet
     * @param {Contract} contract - Interface to the contract
     */
    constructor(contract, contractAddr) {
        this.wallet = null;
        this.contract = contract;
        this.contractAddr = contractAddr;
    }
    /**
     * readState
     *
     * @returns {UniteSchemaState}
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
        await this.contract.writeInteraction({ function: 'addContributor' });
    }
    /**
     * setRole - Updates the role of an address (wallet must be 'editor')
     *
     * @param {Role} role - can be 'user', 'editor' or 'contributor'
     * @param {string} userAddr - Address to change the role from
     */
    async setRole(role, userAddr) {
        const interaction = { function: 'setRole', userAddr, role };
        await this.contract.writeInteraction(interaction);
    }
    /**
     * addProposal - new proposal in the standard
     *
     * @param {string} proposalName
     * @param {string} comment
     * @param {string} name - Field Name
     * @param {string} description - Field Description
     * @param {FieldType} type - Field Type
     */
    async addProposal(proposalName, comment, name, description, type) {
        const field = { name, description, type };
        const interaction = { function: 'addProposal', proposalName, comment, field };
        await this.contract.writeInteraction(interaction);
    }
    /**
     * addComment
     *
     * @param {number} proposalId
     * @param {string} text
     */
    async addComment(proposalId, text) {
        const interaction = { function: 'addComment', proposalId, text };
        await this.contract.writeInteraction(interaction);
    }
    /**
     * updateProposal
     *
     * @param {number} proposalId
     * @param {ProposalStatus} status
     */
    async updateProposal(proposalId, status, update = '') {
        const interaction = { function: 'updateProposal', proposalId, status, update };
        await this.contract.writeInteraction(interaction);
    }
    async getSchema() {
        const interaction = { function: 'getSchema' };
        const result = await this.contract.viewState(interaction);
        return result.result.schema;
    }
}
exports.default = Standard;
