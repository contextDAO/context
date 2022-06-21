"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Connect a wallet to the context
 *
 * @param {UniteContext}unite
 * @param {JWKInterface} json
 */
async function connectWallet(unite, json) {
    const wallet = {
        json,
        address: await unite.arweave.wallets.getAddress(json),
    };
    unite.wallet = wallet;
}
exports.default = connectWallet;
