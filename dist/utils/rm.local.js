"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalance = exports.getAddress = exports.mineBlock = exports.testWallet = void 0;
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
/**
 * getAddress
 *
 * @param {Arweave} arweave
 * @param {JWKInterface} wallet
 * @return {string}
 */
async function getAddress(arweave, wallet) {
    const address = await arweave.wallets.jwkToAddress(wallet);
    return address;
}
exports.getAddress = getAddress;
/**
 * getBalance for a wallet
 *
 * @param {Arweave} arweave
 * @param {string | JWKInterface} wallet
 */
async function getBalance(arweave, wallet) {
    const address = typeof wallet === "string"
        ? wallet
        : await getAddress(arweave, wallet);
    const balance = await arweave.wallets.getBalance(address);
    const ar = arweave.ar.winstonToAr(balance);
    return parseFloat(ar);
}
exports.getBalance = getBalance;
