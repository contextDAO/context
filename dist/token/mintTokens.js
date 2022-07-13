"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getContext_1 = __importDefault(require("../context/getContext"));
/**
 * mintTokens
 *
 * @param {DappContext} dapp
 * @param {number} qty
 */
async function mintTokens(dapp, qty) {
    // Check Errors.
    if (!dapp || !dapp.wallet) {
        throw (new Error(`You need to init the dapp and connect a wallet first`));
    }
    const unite = await (0, getContext_1.default)(dapp);
    // Mint Tokens.
    const interaction = {
        function: "mintTokens",
        qty,
    };
    await unite.contract.writeInteraction(interaction);
}
exports.default = mintTokens;
