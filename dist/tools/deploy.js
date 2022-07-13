"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
const index_1 = require("../index");
const mineBlock_1 = __importDefault(require("../utils/mineBlock"));
const schemas_1 = require("../utils/schemas");
const main = async (network, walletFile) => {
    if (!network || !walletFile) {
        console.log("Usage: node deploy.js --network=mine|testnet|arweave --wallet=<json_wallet_file>");
        process.exit();
    }
    const mine = network !== `mainnet`;
    const wallet = (0, index_1.openWallet)(walletFile);
    const dapp = await (0, index_1.initContext)({ network, wallet });
    if (mine)
        await dapp.arweave.api.get(`/mint/${dapp.wallet?.address}/1000000000000000`);
    // Deploy Context Registry.
    console.log("Deploy Context");
    await (0, index_1.deployContext)(dapp);
    console.log("Context Registry : " + dapp.contextAddr);
    if (mine)
        await (0, mineBlock_1.default)(dapp.arweave);
    // Create Human Schema.
    console.log("Register Human");
    await (0, index_1.createSchema)(dapp, `Human`, schemas_1.humanState);
    if (mine)
        await (0, mineBlock_1.default)(dapp.arweave);
    // Create Organization Schema.
    console.log("Register Organization");
    await (0, index_1.createSchema)(dapp, `Org`, schemas_1.organizationState);
    if (mine)
        await (0, mineBlock_1.default)(dapp.arweave);
};
const argv = (0, minimist_1.default)(process.argv.slice(1));
main(argv.network, argv.wallet);
