"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const index_1 = require("../index");
const states = __importStar(require("./schemas"));
let arlocal;
let unite;
const prepareWallet = async (walletName) => {
    const walletFile = path_1.default.join(__dirname, "wallets", walletName);
    const wallet = JSON.parse(fs_1.default.readFileSync(walletFile).toString());
    const walletAddress = await unite.getAddress(wallet);
    await unite.arweave.api.get(`/mint/${walletAddress}/1000000000000000`);
    return wallet;
};
const deploySchema = async (wallet, name, state) => {
    const schema = await unite.deploySchema(wallet, name, state);
    console.log(`${name} schema: ${schema.contractAddr}`);
};
const main = async () => {
    const wallet = await prepareWallet("wallet_test_1.json");
    unite = await index_1.Unite.init("mainnet");
    await deploySchema(wallet, "Human", states.humanState);
    unite.write(wallet, 'cryptobenkei', 'Human', {
        name: `cryptobenkei`,
        url: `https://beacons.ai/cryptobenkei`
    });
    await unite.set(wallet, `cryptobenkei`, `url`, `https://beacons.ai/cryptobenkei`);
    const benkei = await unite.read('cryptobenkei');
    unite.write(wallet, 'starkpets', 'Collection', {
        name: `starkpets`,
        url: `https://discord.gg/HepfrTpd`
    });
    await unite.addItem(wallet, `starkpets`, `tokens`, 20, {
        name: `CoolPet`,
        image: `ar://12345`
    });
    const nft = await unite.read('starkpets#tokens-20');
    console.log(benkei, nft);
};
main();
