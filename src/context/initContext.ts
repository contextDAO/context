import Arweave from "arweave";
import { Wallet } from "../types/types";
import { SmartWeaveNodeFactory, LoggerFactory } from "redstone-smartweave";
import { Network, DappContext } from "../types/types";

/**
 * Init Context Instance
 *
 * @param {Network} network
 * @param {JWKInterface} wallet
 * @return {Context}
 */
export default async function initContext(network: Network, wallet?: Wallet): Promise<DappContext> {
  const dapp: DappContext = {} as DappContext;
  dapp.network = network;

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
  dapp.arweave = Arweave.init(connection);

  // Smartweave.
  dapp.smartweave =
  network === "localhost"
    ? SmartWeaveNodeFactory.forTesting(dapp.arweave)
    : SmartWeaveNodeFactory.memCached(dapp.arweave);

  // Wallet
  if (wallet) {
    dapp.wallet = wallet;
  }

  return dapp;
}


