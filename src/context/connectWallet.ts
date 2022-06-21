import { Wallet } from "../types/types";
import { JWKInterface } from "arweave/node/lib/wallet";
import { UniteContext } from "../types/types";

/**
 * Connect a wallet to the context
 *
 * @param {UniteContext}unite 
 * @param {JWKInterface} json
 */
export default async function connectWallet(unite: UniteContext, json: JWKInterface) {
  const wallet: Wallet = {
    json,
    address: await unite.arweave.wallets.getAddress(json),
  }
  unite.wallet = wallet; 
}


