import { Wallet } from "../types/types";
import { JWKInterface } from "arweave/node/lib/wallet";
import { DappContext } from "../types/types";

/**
 * Connect a wallet to the context
 *
 * @param {DappContext} dapp 
 * @param {JWKInterface} json
 */
export default async function connectWallet(dapp: DappContext, json: JWKInterface) {
  const wallet: Wallet = {
    json,
    address: await dapp.arweave.wallets.getAddress(json),
  }
  context.wallet = wallet; 
}


