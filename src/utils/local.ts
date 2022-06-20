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

/**
 * getAddress
 *
 * @param {Arweave} arweave
 * @param {JWKInterface} wallet
 * @return {string}
 */
export async function getAddress(arweave: Arweave, wallet: JWKInterface): Promise<string> {
  const address = await arweave.wallets.jwkToAddress(wallet);
  return address;
}

/**
 * getBalance for a wallet
 *
 * @param {Arweave} arweave
 * @param {string | JWKInterface} wallet
 */
export async function getBalance(arweave: Arweave, wallet: string | JWKInterface): Promise<number> {
  const address: string =
    typeof wallet === "string"
      ? wallet
      : await getAddress(arweave, wallet as JWKInterface);
  const balance = await arweave.wallets.getBalance(address);
  const ar = arweave.ar.winstonToAr(balance);
  return parseFloat(ar);
}


