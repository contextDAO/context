import { JWKInterface } from "arweave/node/lib/wallet";
import { DappContext } from "../types/types";
/**
 * Connect a wallet to the context
 *
 * @param {DappContext} dapp
 * @param {JWKInterface} json
 */
export default function connectWallet(dapp: DappContext, json: JWKInterface): Promise<void>;
