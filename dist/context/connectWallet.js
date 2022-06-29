"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Connect a wallet to the context
 *
 * @param {DappContext} dapp
 * @param {JWKInterface} json
 */
async function connectWallet(dapp, json) {
    const wallet = {
        json,
        address: await dapp.arweave.wallets.getAddress(json),
    };
    context.wallet = wallet;
}
exports.default = connectWallet;
