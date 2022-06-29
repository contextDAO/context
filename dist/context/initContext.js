"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arweave_1 = __importDefault(require("arweave"));
const redstone_smartweave_1 = require("redstone-smartweave");
/**
 * Get Connection
 *
 * @param {Network} network
 * @return {ArweaveConfiguration}
 */
function getConnection(network) {
    // Connect to Arweave.
    let connection = {};
    if (network === "localhost") {
        connection = { host: "localhost", port: 1984, protocol: "http" };
    }
    else if (network === "testnet") {
        connection = { host: "testnet.redstone.tools", port: 443, protocol: "https" };
    }
    else if (network === "mainnet") {
        connection = { host: "arweave.net", port: 443, protocol: "https" };
    }
    return connection;
}
/**
 * Init Context Instance
 *
 * @param {ContextConfiguration} configuration
 * @return {Context}
 */
async function initContext(configuration) {
    const dapp = {};
    dapp.network = (configuration.network) ? configuration.network : `mainnet`;
    // Arweave.
    redstone_smartweave_1.LoggerFactory.INST.logLevel("error");
    dapp.arweave = arweave_1.default.init(getConnection(dapp.network));
    // Smartweave.
    dapp.smartweave = dapp.network === "localhost"
        ? redstone_smartweave_1.SmartWeaveNodeFactory.forTesting(dapp.arweave)
        : redstone_smartweave_1.SmartWeaveNodeFactory.memCached(dapp.arweave);
    // Wallet
    if (configuration.wallet) {
        dapp.wallet = {
            json: configuration.wallet,
            address: await dapp.arweave.wallets.getAddress(configuration.wallet),
        };
    }
    dapp.contextAddr = (configuration.address) ? configuration.address : ``;
    return dapp;
}
exports.default = initContext;
