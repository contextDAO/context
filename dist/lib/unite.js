"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arweave_1 = __importDefault(require("arweave"));
const redstone_smartweave_1 = require("redstone-smartweave");
const state_1 = require("../utils/state");
const metadata_1 = __importDefault(require("./metadata"));
const src_1 = require("../contracts/src");
const local_1 = require("../utils/local");
/**
 * @class Unite
 */
class Unite {
    /**
     * @Constructor
     * @param {Network} network
     * @param {string} uniteAddr
     */
    constructor(network, uniteAddr = ``) {
        this.network = network;
        this.arweave = {};
        this.smartweave = {};
        this.uniteAddr = uniteAddr;
    }
    /**
     * Init Unite Instance
     *
     * @param {Network} network
     * @return {Unite}
     */
    static async init(network) {
        const unite = new Unite(network);
        let connection = {};
        if (network === "localhost") {
            connection = { host: "localhost", port: 1984, protocol: "http" };
        }
        else if (network === "testnet") {
            connection = {
                host: "testnet.redstone.tools",
                port: 443,
                protocol: "https",
            };
        }
        else if (network === "mainnet") {
            connection = { host: "arweave.net", port: 443, protocol: "https" };
        }
        redstone_smartweave_1.LoggerFactory.INST.logLevel("error");
        unite.arweave = arweave_1.default.init(connection);
        unite.smartweave =
            network === "localhost"
                ? redstone_smartweave_1.SmartWeaveNodeFactory.forTesting(unite.arweave)
                : redstone_smartweave_1.SmartWeaveNodeFactory.memCached(unite.arweave);
        return unite;
    }
    /**
   * get
   *
   * @return {UniteState}
   */
    async get() {
        const unite = this.smartweave.contract(this.uniteAddr);
        const initialState = await unite.readState();
        const state = initialState.state;
        return state;
    }
    /**
     * deployUnite
     *
     * @param {JWKInterface} wallet
     * @return {string}
     */
    async deployUnite(wallet) {
        const state = state_1.uniteState;
        state.owner = await (0, local_1.getAddress)(this.arweave, wallet);
        this.uniteAddr = await this.smartweave.createContract.deploy({
            wallet,
            initState: JSON.stringify(state),
            src: src_1.uniteContractSource,
        });
        return this.uniteAddr;
    }
    /**
     * mint
     *
     * @param {JWKInterface} wallet
     * @param {number} qty - Quantity of tokens
     */
    async mint(wallet, qty) {
        const unite = this.smartweave
            .contract(this.uniteAddr)
            .connect(wallet);
        const interaction = {
            function: "mint",
            qty,
        };
        await unite.writeInteraction(interaction);
    }
    /**
     * createSchema
     *
     * @param {JWKInterface} wallet
     * @param {string} id - Title of the schema
     * @param {schemaState} state - Initial state
     */
    async createSchema(wallet, id, state = state_1.schemaState) {
        state.id = id;
        state.contributors[0].address = await (0, local_1.getAddress)(this.arweave, wallet);
        const contractAddr = await this.smartweave.createContract.deploy({
            wallet,
            initState: JSON.stringify(state),
            src: src_1.schemaContractSource,
        });
        const unite = this.smartweave
            .contract(this.uniteAddr)
            .connect(wallet);
        const interaction = {
            function: "registerSchema",
            id,
            address: contractAddr,
        };
        await unite.writeInteraction(interaction);
    }
    /**
     * getAddress
     *
     * @param {string} id - Schema ID
     * @return {string}
     */
    async getAddress(id) {
        const unite = this.smartweave.contract(this.uniteAddr);
        const interaction = await unite.viewState({ function: 'getSchema', id });
        const contractAddr = interaction.result.schema.address;
        return contractAddr;
    }
    /**
     * getContract
     *
     * @param {JWKInterface} wallet
     * @param {string} id - Title of the schema
     * @return {Contract}
     */
    async getContract(wallet, id) {
        const contractAddr = await this.getAddress(id);
        const contract = this.smartweave.contract(contractAddr);
        contract.connect(wallet);
        return contract;
    }
    /**
     * getSchema
     *
     * @param {string} id
     * @return {SchemaState}
     */
    async getSchema(id) {
        const unite = this.smartweave.contract(this.uniteAddr);
        const interaction = await unite.viewState({ function: 'getSchema', id });
        const contractAddr = interaction.result.schema.address;
        const contract = this.smartweave.contract(contractAddr);
        const initialState = await contract.readState();
        const state = initialState.state;
        return state;
    }
    /**
     * addContributor
     *
     * @param {JWKInterface} wallet
     * @param {string} id - Title of the schema
     */
    async addContributor(wallet, id) {
        const contract = await this.getContract(wallet, id);
        await contract.writeInteraction({ function: "addContributor" });
    }
    /**
     * editContributor
     *
     * @param {JWKInterface} wallet
     * @param {string} id - Title of the schema
     * @param {string} userAddr - Contributor's address
     * @param {string} role
     */
    async editContributor(wallet, id, userAddr, role) {
        const contract = await this.getContract(wallet, id);
        const interaction = { function: "setRole", userAddr, role };
        await contract.writeInteraction(interaction);
    }
    /**
     * geDefinition
     *
     * @param {SchemaState} state - State of the schema
     * @return {string}
     */
    async getDefinition(state) {
        let definition = ``;
        definition += `type ${state.id} {\n`;
        if (state.releaseId > -1) {
            state.releases[state.releaseId].fields.map((field) => {
                const req = field.required === true ? `!` : ``;
                const op = field.array === true ? `[` : ``;
                const cl = field.array === true ? `]` : ``;
                definition += `  ${field.name}: ${op}${field.type}${cl}${req}\n`;
            });
        }
        definition += `}`;
        return definition;
    }
    /**
     * addProposal - new proposal in the standard
     *
     * @param {JWKInterface} wallet
     * @param {string} id - Title of the schema
     * @param {string} proposalName
     * @param {Field} field - Field for the proposal
     */
    async addProposal(wallet, id, proposalName, field) {
        const contract = await this.getContract(wallet, id);
        const interaction = {
            function: "addProposal",
            proposalName,
            field,
        };
        await contract.writeInteraction(interaction);
    }
    /**
     * editProposal
     *
     * @param {JWKInterface} wallet
     * @param {string} id - Title of the schema
     * @param {number} proposalId
     * @param {ProposalStatus} status
     */
    async editProposal(wallet, id, proposalId, status) {
        const contract = await this.getContract(wallet, id);
        const interaction = {
            function: "updateProposal",
            proposalId,
            status,
        };
        await contract.writeInteraction(interaction);
    }
    /**
     *addItem
     *
     * @param {JWKInterface} wallet
     * @param {string} id - Title of the schema
     * @param {string} field - Field ID
     * @param {number} itemId - Item ID
     * @param {any} value - Value of the Field
     * @return {Metadata}
     */
    async addItem(wallet, id, field, itemId, value) {
    }
    /**
     *set
     *
     * @param {JWKInterface} wallet
     * @param {string} id - Title of the schema
     * @param {string} field - Field ID
     * @param {any} value - Value of the Field
     * @return {Metadata}
     */
    async set(wallet, id, field, value) {
    }
    /**
     * read
     *
     * @param {string} id - Title of the schema
     * @return {Metadata}
     */
    async read(id) {
    }
    /**
     * write
     *
     * @param {JWKInterface} wallet
     * @param {string} id - Title of the schema
     * @param {string} schemaId - Schema
     * @param {any} data - Schema release
     * @return {Metadata}
     */
    async write(wallet, id, schemaId, data) {
        const schema = await this.getSchema(schemaId);
        const state = data;
        state.owner = await (0, local_1.getAddress)(this.arweave, wallet);
        state.id = id;
        state.schema = schemaId;
        state.release = state_1.schemaState.releaseId;
        const contractAddr = await this.smartweave.createContract.deploy({
            wallet,
            initState: JSON.stringify(state),
            src: src_1.metadataContractSource,
        });
        const contract = this.smartweave
            .contract(contractAddr)
            .connect(wallet);
        const metadata = new metadata_1.default(wallet, contract, contractAddr);
        return metadata;
    }
}
exports.default = Unite;
