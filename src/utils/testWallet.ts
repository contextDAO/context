import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { Wallet } from "../types/types";

/**
 * TestWallet
 * @param {Arweave} arweave
 * @return {JWKInterface}
 */
export default async function testWallet(arweave: Arweave): Promise<Wallet> {
  const json: JWKInterface = await arweave.wallets.generate();
  const address = await arweave.wallets.getAddress(json);
  await arweave.api.get(`/mint/${address}/1000000000000000`);
  return {
    json,
    address,
  };
}

