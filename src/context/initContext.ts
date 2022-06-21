import Arweave from "arweave";
import { Wallet } from "../types/types";
import { SmartWeaveNodeFactory, LoggerFactory } from "redstone-smartweave";
import { Network, UniteContext } from "../types/types";

/**
 * Init Unite Instance
 *
 * @param {Network} network
 * @param {JWKInterface} wallet
 * @return {Unite}
 */
export default async function initContext(network: Network, wallet?: Wallet): Promise<UniteContext> {
  const unite: UniteContext = {} as UniteContext;
  unite.network = network;

  // Connect to Arweave.
  let connection = {};
  if (network === "localhost") {
    connection = { host: "localhost", port: 1984, protocol: "http" };
  } else if (network === "testnet") {
    connection = { host: "testnet.redstone.tools", port: 443, protocol: "https" };
  } else if (network === "mainnet") {
    connection = { host: "arweave.net", port: 443, protocol: "https" };
  }
  LoggerFactory.INST.logLevel("error");
  unite.arweave = Arweave.init(connection);

  // Smartweave.
  unite.smartweave =
  network === "localhost"
    ? SmartWeaveNodeFactory.forTesting(unite.arweave)
    : SmartWeaveNodeFactory.memCached(unite.arweave);

  // Wallet
  if (wallet) {
    unite.wallet = wallet;
  }

  return unite;
}


