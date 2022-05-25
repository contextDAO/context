"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arweave_1 = __importDefault(require("arweave"));
const redstone_smartweave_1 = require("redstone-smartweave");
const state_1 = require("../utils/state");
const standard_1 = __importDefault(require("./standard"));
const metadata_1 = __importDefault(require("./metadata"));
const src_1 = require("../../dist/src");
/**
 * @class Unite
 */
class Unite {
    /**
     * @Constructor
     * @param {Network} network
     */
    constructor(network) {
        this.network = network;
        this.arweave = {};
        this.smartweave = {};
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
        if (network === 'localhost') {
            connection = { host: 'localhost', port: 1984, protocol: 'http' };
        }
        else if (network === 'testnet') {
            connection = { host: 'testnet.redstone.tools', port: 443, protocol: 'https' };
        }
        else if (network === 'mainnet') {
            connection = { host: 'arweave.net', port: 443, protocol: 'https' };
        }
        redstone_smartweave_1.LoggerFactory.INST.logLevel('error');
        unite.arweave = arweave_1.default.init(connection);
        unite.smartweave = redstone_smartweave_1.SmartWeaveNodeFactory.memCached(unite.arweave);
        return unite;
    }
    /*
     * Stop arlocal
     */
    stop() {
    }
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
        const address = (typeof wallet === 'string') ? wallet : (await this.getAddress(wallet));
        const balance = await this.arweave.wallets.getBalance(address);
        const ar = this.arweave.ar.winstonToAr(balance);
        return parseFloat(ar);
    }
    /**
     * deployStandard
     *
     * @param {JWKInterface} wallet
     * @return {Standard}
     */
    async deployStandard(wallet, title, description, standardFrom = {}) {
        const state = state_1.initialState;
        state.title = title;
        state.description = description;
        state.contributors[0].address = await this.getAddress(wallet);
        if (standardFrom.standardId) {
            state.from = standardFrom;
        }
        const contractAddr = await this.smartweave.createContract.deploy({
            wallet,
            initState: JSON.stringify(state),
            src: src_1.standardContractSource
        });
        const contract = this.smartweave.contract(contractAddr).connect(wallet);
        const standard = new standard_1.default(wallet, contract, contractAddr);
        return standard;
    }
    /**
     * deployMetadata
     *
     * @param {JWKInterface} wallet
     * @return {Metadata}
     */
    async deployMetadata(wallet, title, description) {
        const state = state_1.initialMetadata;
        state.title = title;
        state.description = description;
        const contractAddr = await this.smartweave.createContract.deploy({
            wallet,
            initState: JSON.stringify(state),
            src: src_1.metadataContractSource,
        });
        const contract = this.smartweave.contract(contractAddr).connect(wallet);
        const metadata = new metadata_1.default(wallet, contract, contractAddr);
        return metadata;
    }
}
exports.default = Unite;
