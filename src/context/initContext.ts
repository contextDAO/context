import Arweave from "arweave";
import { Wallet } from "../types/types";
import { SmartWeaveNodeFactory, LoggerFactory } from "redstone-smartweave";
import { Network, DappContext } from "../types/types";
import {JWKInterface} from "arweave/node/lib/wallet";

type ArweaveConfiguration = {
  host: string;
  port: number;
  protocol: string;
}

type ContextConfiguration = {
  network?: Network,
  wallet?: JWKInterface,
  address?: string;
};

/**
 * Get Connection
 *
 * @param {Network} network
 * @return {ArweaveConfiguration}
 */
function getConnection(network: Network): ArweaveConfiguration {
  // Connect to Arweave.
  let connection: ArweaveConfiguration = {} as ArweaveConfiguration;
  if (network === "localhost") {
    connection = { host: "localhost", port: 1984, protocol: "http" };
  } else if (network === "testnet") {
    connection = { host: "testnet.redstone.tools", port: 443, protocol: "https" };
  } else if (network === "mainnet") {
    connection = { host: "arweave.net", port: 443, protocol: "https" };
  }
  return connection; 
}

/**
 * Init Context Instance
 *
 * @param {ContextConfiguration} configuration
 * @return {Context}
 */
export default async function initContext(configuration: ContextConfiguration): Promise<DappContext> {
  const dapp: DappContext = {} as DappContext;
  dapp.network = (configuration.network) ? configuration.network : `mainnet`;

  // Arweave.
  LoggerFactory.INST.logLevel("error");
  dapp.arweave = Arweave.init(getConnection(dapp.network));

  // Smartweave.
  switch (dapp.network) {
    case `localhost` : 
      dapp.smartweave = SmartWeaveNodeFactory.forTesting(dapp.arweave);
      break;
    case `testnet` : 
      dapp.smartweave = SmartWeaveNodeFactory.memCachedBased(dapp.arweave).useArweaveGateway().build();
      break;
    case `mainnet` : 
      dapp.smartweave = SmartWeaveNodeFactory.memCached(dapp.arweave);
      break;
  }

  // Wallet
  if (configuration.wallet) {
    dapp.wallet = {
      json: configuration.wallet,
      address: await dapp.arweave.wallets.getAddress(configuration.wallet),
    }
  }

  dapp.contextAddr = (configuration.address) ? configuration.address: ``;
  return dapp;
}


