"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const arlocal_1 = __importDefault(require("arlocal"));
const index_1 = require("../index");
let arlocal;
let unite;
const main = async () => {
    arlocal = new arlocal_1.default(1984, false);
    await arlocal.start();
    unite = await index_1.Unite.init("localhost");
    const walletFile = path_1.default.join(__dirname, "wallets", "wallet_test_1.json");
    const wallet = JSON.parse(fs_1.default.readFileSync(walletFile).toString());
    const walletAddress = await unite.getAddress(wallet);
    await unite.arweave.api.get(`/mint/${walletAddress}/1000000000000000`);
    const standard = await unite.deployStandard(wallet, "Base NFT", "Basic NFT Metadata");
    console.log("Contract deployed to: " + standard.contractAddr);
};
main();
