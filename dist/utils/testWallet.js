"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * TestWallet
 * @param {Arweave} arweave
 * @return {JWKInterface}
 */
async function testWallet(arweave) {
    const json = await arweave.wallets.generate();
    const address = await arweave.wallets.getAddress(json);
    await arweave.api.get(`/mint/${address}/1000000000000000`);
    return {
        json,
        address,
    };
}
exports.default = testWallet;
