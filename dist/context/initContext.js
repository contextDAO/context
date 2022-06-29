"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arweave_1 = __importDefault(require("arweave"));
const redstone_smartweave_1 = require("redstone-smartweave");
/**
 * Init Context Instance
 *
 * @param {Network} network
 * @param {JWKInterface} wallet
 * @return {Context}
 */
async function initContext(network, wallet) {
    const dapp = {};
    dapp.network = network;
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
    redstone_smartweave_1.LoggerFactory.INST.logLevel("error");
    dapp.arweave = arweave_1.default.init(connection);
    // Smartweave.
    dapp.smartweave =
        network === "localhost"
            ? redstone_smartweave_1.SmartWeaveNodeFactory.forTesting(dapp.arweave)
            : redstone_smartweave_1.SmartWeaveNodeFactory.memCached(dapp.arweave);
    // Wallet
    if (wallet) {
        dapp.wallet = wallet;
    }
    return dapp;
}
exports.default = initContext;
