import { JWKInterface } from "arweave/node/lib/wallet";
import { UniteContext } from "../types/types";
/**
 * Connect a wallet to the context
 *
 * @param {UniteContext}unite
 * @param {JWKInterface} json
 */
export default function connectWallet(unite: UniteContext, json: JWKInterface): Promise<void>;
