"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * mineBlock
 *
 * @param {Arweave} arweave
 */
async function mineBlock(arweave) {
    await arweave.api.get("mine");
}
exports.default = mineBlock;
