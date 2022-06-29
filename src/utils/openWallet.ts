import fs from "fs"; 
import { JWKInterface } from "arweave/node/lib/wallet";

/**
 * openWallet
 * @param {string} walletFile
 * @return {JWKInterface}
 */
export default function openWallet(walletFile: string): JWKInterface {
  const json: JWKInterface = JSON.parse(
    fs.readFileSync(walletFile).toString()
  );
  return json;
}

