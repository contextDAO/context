"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mineBlock = exports.testWallet = void 0;
/**
 * TestWallet
 * @param {Arweave} arweave
 * @return {JWKInterface}
 */
async function testWallet(arweave) {
    const wallet = await arweave.wallets.generate();
    const walletAddress = await arweave.wallets.getAddress(wallet);
    await arweave.api.get(`/mint/${walletAddress}/1000000000000000`);
    return wallet;
}
exports.testWallet = testWallet;
/**
 * mineBlock
 *
 * @param {Arweave} arweave
 */
async function mineBlock(arweave) {
    await arweave.api.get("mine");
}
exports.mineBlock = mineBlock;
