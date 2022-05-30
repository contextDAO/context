import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";

/**
 * TestWallet
 * @param {Arweave} arweave
 * @return {JWKInterface}
 */
export async function testWallet(arweave: Arweave): Promise<JWKInterface> {
  const wallet: JWKInterface = await arweave.wallets.generate();
  const walletAddress = await arweave.wallets.getAddress(wallet);
  await arweave.api.get(`/mint/${walletAddress}/1000000000000000`);
  return wallet;
}

/**
 * mineBlock
 *
 * @param {Arweave} arweave 
 */
export async function mineBlock(arweave: Arweave) {
  await arweave.api.get("mine");
}
