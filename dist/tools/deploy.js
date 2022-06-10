"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const minimist_1 = __importDefault(require("minimist"));
const index_1 = require("../index");
const main = async (network, walletFile) => {
    if (!network || !walletFile) {
        console.log("Usage: node deploy.js --network=localhost|testnet|arweave --wallet=<json_wallet_file>");
        process.exit();
    }
    let unite = {};
    unite = await index_1.Unite.init(network);
    const wallet = JSON.parse(fs_1.default.readFileSync(walletFile).toString());
    const human = await unite.deploySchema(wallet, "human");
    console.log("@human schema: " + human.contractAddr);
    const organization = await unite.deploySchema(wallet, "organization");
    console.log("@organization schema: " + organization.contractAddr);
};
const argv = (0, minimist_1.default)(process.argv.slice(1));
main(argv.network, argv.wallet);
