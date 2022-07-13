"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getContext_1 = __importDefault(require("../context/getContext"));
/**
 * getBalance
 *
 * @param {DappContext} dapp
 * @param {string} address
 */
async function getBalance(dapp, address) {
    if (!dapp || !dapp.wallet) {
        throw (new Error(`You need to init the context and connect a wallet first`));
    }
    const context = await (0, getContext_1.default)(dapp);
    const { result: balance } = await context.contract.viewState({
        function: 'balance',
        target: address,
    });
    return balance;
}
exports.default = getBalance;
