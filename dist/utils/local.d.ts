import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";
/**
 * TestWallet
 * @param {Arweave} arweave
 * @return {JWKInterface}
 */
export declare function testWallet(arweave: Arweave): Promise<JWKInterface>;
/**
 * mineBlock
 *
 * @param {Arweave} arweave
 */
export declare function mineBlock(arweave: Arweave): Promise<void>;
/**
 * getAddress
 *
 * @param {Arweave} arweave
 * @param {JWKInterface} wallet
 * @return {string}
 */
export declare function getAddress(arweave: Arweave, wallet: JWKInterface): Promise<string>;
/**
 * getBalance for a wallet
 *
 * @param {Arweave} arweave
 * @param {string | JWKInterface} wallet
 */
export declare function getBalance(arweave: Arweave, wallet: string | JWKInterface): Promise<number>;
