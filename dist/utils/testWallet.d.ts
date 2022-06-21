import Arweave from "arweave";
import { Wallet } from "../types/types";
/**
 * TestWallet
 * @param {Arweave} arweave
 * @return {JWKInterface}
 */
export default function testWallet(arweave: Arweave): Promise<Wallet>;
