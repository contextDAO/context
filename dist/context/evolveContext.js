"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getContext_1 = __importDefault(require("./getContext"));
/**
 * deployContext
 *
 * @param {DappContext} dapp
 * @param {string} txId
 */
async function evolveContext(dapp, txId) {
    if (!dapp || !dapp.wallet) {
        throw (new Error(`You need to init the context and connect a wallet first`));
    }
    const interaction = {
        function: "evolve",
        value: txId,
    };
    console.log(interaction);
    const context = await (0, getContext_1.default)(dapp);
    await context.contract.writeInteraction(interaction);
}
exports.default = evolveContext;
