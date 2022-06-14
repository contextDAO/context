"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arweave_1 = __importDefault(require("arweave"));
const redstone_smartweave_1 = require("redstone-smartweave");
const state_1 = require("../utils/state");
const schema_1 = __importDefault(require("./schema"));
const metadata_1 = __importDefault(require("./metadata"));
const src_1 = require("../contracts/src");
/**
 * @class Unite
 */
class Unite {
    /**
     * @Constructor
     * @param {Network} network
     * @param {string} registryAddr
     */
    constructor(network, registryAddr = ``) {
        this.network = network;
        this.arweave = {};
        this.smartweave = {};
        this.registry = registryAddr;
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
     * Stop arlocal
     */
    stop() { }
    /**
     * getAddress
     *
     * @param {JWKInterface} wallet
     * @return {string}
     */
    async getAddress(wallet) {
        const address = await this.arweave.wallets.jwkToAddress(wallet);
        return address;
    }
    /**
     * getBalance for a wallet
     *
     * @param {string | JWKInterface} wallet
     */
    async getBalance(wallet) {
        const address = typeof wallet === "string"
            ? wallet
            : await this.getAddress(wallet);
        const balance = await this.arweave.wallets.getBalance(address);
        const ar = this.arweave.ar.winstonToAr(balance);
        return parseFloat(ar);
    }
    /**
     * getSchema
     *
     * @param {string} contractAddr
     * @return {Schema}
     */
    async getSchema(contractAddr) {
        const contract = this.smartweave.contract(contractAddr);
        const schema = new schema_1.default(contract, contractAddr);
        return schema;
    }
    /**
     * geDefinitiont
     *
     * @param {SchemaState} state - State of the schema
     * @return {string}
     */
    async getDefinition(state) {
        let definition = ``;
        definition += `type ${state.title} {\n`;
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
     * deploySchema
     *
     * @param {JWKInterface} wallet
     * @return {Schema}
     */
    async deployRegistry(wallet) {
        const state = state_1.registryState;
        state.owner = await this.getAddress(wallet);
        const contractAddr = await this.smartweave.createContract.deploy({
            wallet,
            initState: JSON.stringify(state),
            src: src_1.schemaContractSource,
        });
        const contract = this.smartweave
            .contract(contractAddr)
            .connect(wallet);
        const schema = new schema_1.default(contract, contractAddr);
        return schema;
    }
    /**
     * deploySchema
     *
     * @param {JWKInterface} wallet
     * @param {string} title - Title of the schema
     * @return {Schema}
     */
    async deploySchema(wallet, title) {
        const state = state_1.schemaState;
        state.title = title;
        state.contributors[0].address = await this.getAddress(wallet);
        const contractAddr = await this.smartweave.createContract.deploy({
            wallet,
            initState: JSON.stringify(state),
            src: src_1.schemaContractSource,
        });
        const contract = this.smartweave
            .contract(contractAddr)
            .connect(wallet);
        const schema = new schema_1.default(contract, contractAddr);
        return schema;
    }
    /**
     * deployMetadata
     *
     * @param {JWKInterface} wallet
     * @param {string} title - Title of the schema
     * @param {string} schema - Schema
     * @param {number} release - Schema release
     * @return {Metadata}
     */
    async deployMetadata(wallet, title, schema, release) {
        const state = state_1.metadataState;
        state.owner = await this.getAddress(wallet);
        state.title = title;
        state.schema = schema;
        state.release = release;
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
    /**
     * Mine a new block - only localhost
     */
    async mine() {
        if (this.network === 'localhost') {
            await this.arweave.api.get("mine");
        }
    }
}
exports.default = Unite;
