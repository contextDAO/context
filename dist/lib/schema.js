"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class Schema - interactions with the standard contract.
 */
class Schema {
    /**
     * @constructor
     *
     * @param {Contract} contract - Interface to the contract
     * @param {string} contractAddr - Contract Address
     */
    constructor(contract, contractAddr) {
        this.wallet = null;
        this.contract = contract;
        this.contractAddr = contractAddr;
    }
    /**
     * readState
     *
     * @return {SchemaState}
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
    /**
     * setRole - Updates the role of an address (wallet must be 'editor')
     *
     * @param {Role} role - can be 'user', 'editor' or 'contributor'
     * @param {string} userAddr - Address to change the role from
     */
    async setRole(role, userAddr) {
        const interaction = { function: "setRole", userAddr, role };
        await this.contract.writeInteraction(interaction);
    }
    /**
     * addProposal - new proposal in the standard
     *
     * @param {string} proposalName
     * @param {Field} field - Field for the proposal
     */
    async addProposal(proposalName, field) {
        const interaction = {
            function: "addProposal",
            proposalName,
            field,
        };
        await this.contract.writeInteraction(interaction);
    }
    /**
     * updateProposal
     *
     * @param {number} proposalId
     * @param {ProposalStatus} status
     * @param {UpdateVersion} update - Can be major, minor or patch.
     */
    async updateProposal(proposalId, status) {
        const interaction = {
            function: "updateProposal",
            proposalId,
            status,
        };
        await this.contract.writeInteraction(interaction);
    }
}
exports.default = Schema;
