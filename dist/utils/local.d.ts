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
