import Arweave from "arweave";
import {
  Contract,
  SmartWeave,
  SmartWeaveNodeFactory,
  LoggerFactory,
} from "redstone-smartweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { schemaState, metadataState } from "../utils/state";
import Schema from "./schema";
import {SchemaState } from "../contracts/Schema/types/types";
import Metadata from "./metadata";
import { MetadataState } from "../contracts/Metadata/types/types";
import {
  schemaContractSource,
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
   * getSchema
   *
   * @param {string} contractAddr
   * @return {Schema}
   */
  async getSchema(contractAddr: string): Promise<Schema> {
    const contract: Contract = this.smartweave.contract(contractAddr);
    const schema = new Schema(contract, contractAddr);
    return schema;
  }

  /**
   * deploySchema
   *
   * @param {JWKInterface} wallet
   * @param {string} title - Title of the schema
   * @param {string} description - Full description
   * @return {Schema}
   */
  async deploySchema(
    wallet: JWKInterface,
    title: string,
    description: string,
  ): Promise<Schema> {
    const state: SchemaState = schemaState;
    state.title = title;
    state.description = description;
    state.contributors[0].address = await this.getAddress(wallet);
    const contractAddr = await this.smartweave.createContract.deploy({
      wallet,
      initState: JSON.stringify(state),
      src: schemaContractSource,
    });

    const contract: Contract = this.smartweave
      .contract(contractAddr)
      .connect(wallet);
    const schema = new Schema(contract, contractAddr);
    return schema;
  }

  /**
   * deployMetadata
   *
   * @param {JWKInterface} wallet
   * @param {string} title - Title of the schema
   * @param {string} description - Full description
   * @return {Metadata}
   */
  async deployMetadata(
    wallet: JWKInterface,
    title: string,
    description: string
  ): Promise<Metadata> {
    const state: MetadataState = metadataState;
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
