import Arweave from "arweave";
import {
  Contract,
  SmartWeave,
  SmartWeaveNodeFactory,
  LoggerFactory,
} from "redstone-smartweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { initialState, initialMetadata } from "../utils/state";
import Standard from "./standard";
import {
  UniteSchemaState,
  StandardFrom,
} from "../contracts/types/standardTypes";
import Metadata from "./metadata";
import { MetadataSchemaState } from "../contracts/types/metadataTypes";
import {
  standardContractSource,
  metadataContractSource,
} from "../contracts/src";

type Network = "localhost" | "testnet" | "mainnet";

/**
 * @class Unite
 */
export default class Unite {
  network: Network;
  arweave: Arweave;
  smartweave: SmartWeave;

  /**
   * @Constructor
   * @param {Network} network
   */
  constructor(network: Network) {
    this.network = network;
    this.arweave = {} as Arweave;
    this.smartweave = {} as SmartWeave;
  }

  /**
   * Init Unite Instance
   *
   * @param {Network} network
   * @return {Unite}
   */
  static async init(network: Network): Promise<Unite> {
    const unite = new Unite(network);
    let connection = {};
    if (network === "localhost") {
      connection = { host: "localhost", port: 1984, protocol: "http" };
    } else if (network === "testnet") {
      connection = {
        host: "testnet.redstone.tools",
        port: 443,
        protocol: "https",
      };
    } else if (network === "mainnet") {
      connection = { host: "arweave.net", port: 443, protocol: "https" };
    }
    LoggerFactory.INST.logLevel("error");
    unite.arweave = Arweave.init(connection);
    unite.smartweave =
      network === "localhost"
        ? SmartWeaveNodeFactory.forTesting(unite.arweave)
        : SmartWeaveNodeFactory.memCached(unite.arweave);
    return unite;
  }

  /**
   * Stop arlocal
   */
  stop() {}

  /**
   * getAddress
   *
   * @param {JWKInterface} wallet
   * @return {string}
   */
  async getAddress(wallet: JWKInterface): Promise<string> {
    const address = await this.arweave.wallets.jwkToAddress(wallet);
    return address;
  }

  /**
   * getBalance for a wallet
   *
   * @param {string | JWKInterface} wallet
   */
  async getBalance(wallet: string | JWKInterface): Promise<number> {
    const address: string =
      typeof wallet === "string"
        ? wallet
        : await this.getAddress(wallet as JWKInterface);
    const balance = await this.arweave.wallets.getBalance(address);
    const ar = this.arweave.ar.winstonToAr(balance);
    return parseFloat(ar);
  }

  /**
   * getStandard
   *
   * @param {string} contractAddr
   * @return {Standard}
   */
  async getStandard(contractAddr: string): Promise<Standard> {
    const contract: Contract = this.smartweave.contract(contractAddr);
    const standard = new Standard(contract, contractAddr);
    return standard;
  }

  /**
   * deployStandard
   *
   * @param {JWKInterface} wallet
   * @param {string} title - Title of the standard
   * @param {string} description - Full description
   * @param {StandardFrom} standardFrom - Inherits from
   * @return {Standard}
   */
  async deployStandard(
    wallet: JWKInterface,
    title: string,
    description: string,
    standardFrom: StandardFrom = {} as StandardFrom
  ): Promise<Standard> {
    const state: UniteSchemaState = initialState;
    state.title = title;
    state.description = description;
    state.contributors[0].address = await this.getAddress(wallet);
    if (standardFrom.standardId) {
      state.from = standardFrom;
    }
    const contractAddr = await this.smartweave.createContract.deploy({
      wallet,
      initState: JSON.stringify(state),
      src: standardContractSource,
    });

    const contract: Contract = this.smartweave
      .contract(contractAddr)
      .connect(wallet);
    const standard = new Standard(contract, contractAddr);
    return standard;
  }

  /**
   * deployMetadata
   *
   * @param {JWKInterface} wallet
   * @param {string} title - Title of the standard
   * @param {string} description - Full description
   * @return {Metadata}
   */
  async deployMetadata(
    wallet: JWKInterface,
    title: string,
    description: string
  ): Promise<Metadata> {
    const state: MetadataSchemaState = initialMetadata;
    state.title = title;
    state.description = description;
    const contractAddr = await this.smartweave.createContract.deploy({
      wallet,
      initState: JSON.stringify(state),
      src: metadataContractSource,
    });

    const contract: Contract = this.smartweave
      .contract(contractAddr)
      .connect(wallet);
    const metadata = new Metadata(wallet, contract, contractAddr);
    return metadata;
  }

  /**
   * Mine a new block - only localhost
   */
  async mine() {
    if (this.network === 'localhost') {
      await this.arweave.api.get("mine"); 
    }
  }
}
