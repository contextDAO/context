"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../contracts/src");
const getContext_1 = __importDefault(require("../context/getContext"));
/**
 * deployContext
 *
 * @param {DappContext} dapp
 * @param {string} version
 */
async function evolveContext(dapp, version) {
    if (!dapp || !dapp.wallet) {
        throw (new Error(`You need to init the context and connect a wallet first`));
    }
    const tx = await dapp.arweave.createTransaction({ data: src_1.contextContractSource }, dapp.wallet.json);
    tx.addTag('App-Name', 'Context');
    tx.addTag('App-Version', version);
    tx.addTag('Content-Type', 'application/javascript');
    await dapp.arweave.transactions.sign(tx, dapp.wallet.json);
    const evolvedContractTxId = tx.id;
    await dapp.arweave.transactions.post(tx);
    // Call evolve function.
    const context = await (0, getContext_1.default)(dapp);
    const interaction = {
        function: "evolve",
        value: evolvedContractTxId,
    };
    await context.contract.writeInteraction(interaction);
}
exports.default = evolveContext;
