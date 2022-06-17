import Arweave from "arweave";
import {
  Contract,
  SmartWeave,
  SmartWeaveNodeFactory,
  LoggerFactory,
} from "redstone-smartweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { UniteState } from "../contracts/Unite/types/types";
import { schemaState, metadataState, uniteState } from "../utils/state";
import Schema from "./schema";
import {SchemaState } from "../contracts/Schema/types/types";
import Metadata from "./metadata";
import { MetadataState } from "../contracts/Metadata/types/types";
import {
  schemaContractSource,
  metadataContractSource,
  uniteContractSource,
} from "../contracts/src";

type Network = "localhost" | "testnet" | "mainnet";

/**
 * @class Unite
 */
export default class Unite {
  network: Network;
  arweave: Arweave;
  smartweave: SmartWeave;
  uniteAddr: string;

  /**
   * @Constructor
   * @param {Network} network
   * @param {string} uniteAddr
   */
  constructor(network: Network, uniteAddr: string = ``) {
    this.network = network;
    this.arweave = {} as Arweave;
    this.smartweave = {} as SmartWeave;
    this.uniteAddr = uniteAddr;
  }

  /**
   * Init Unite Instance
   *
   * @param {Network} network
   * @return {Unite}
   */
  static async init(network: Network ): Promise<Unite> {
    const unite = new Unite( network );
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
   * get
   *
   * @return {UniteState}
   */
  async get(): Promise<UniteState> {
    const unite: Contract = this.smartweave.contract(this.uniteAddr);
    const initialState = await unite.readState();
    const state: UniteState = initialState.state as UniteState;
    return state;
  }

  /**
   * geDefinitiont
   *
   * @param {SchemaState} state - State of the schema
   * @return {string}
   */
  async getDefinition(state: SchemaState): Promise<string> {
    let definition: string = ``;
    definition += `type ${state.title} {\n`;
    if (state.releaseId > -1) {
      state.releases[state.releaseId].fields.map((field) => {
        const req = field.required === true ? `!` : ``;
        const op = field.array === true ? `[` : ``;
        const cl  = field.array === true ? `]` : ``;
        definition += `  ${field.name}: ${op}${field.type}${cl}${req}\n`;
      })
    }
    definition += `}`;
    return definition;
  }

  /**
   * deployUnite
   *
   * @param {JWKInterface} wallet
   * @return {string}
   */
  async deployUnite(
    wallet: JWKInterface,
  ): Promise<string> {
    const state: UniteState = uniteState;
    state.owner = await this.getAddress(wallet);
    this.uniteAddr = await this.smartweave.createContract.deploy({
      wallet,
      initState: JSON.stringify(state),
      src: uniteContractSource,
    });
    return this.uniteAddr;
  }

  /**
   * mint
   *
   * @param {JWKInterface} wallet
   * @param {number} qty - Quantity of tokens
   */
  async mint(
    wallet: JWKInterface,
    qty: number,
  ) {
    const unite: Contract = this.smartweave
      .contract(this.uniteAddr)
      .connect(wallet);
    const interaction = {
      function: "mint",
      qty,
    };
    await unite.writeInteraction(interaction);
  }

  /**
   * registerSchema
   *
   * @param {JWKInterface} wallet
   * @param {string} id - Name (ID) of the schema
   * @param {string} address - Adress where the Schema has been deployed.
   */
  async registerSchema(
    wallet: JWKInterface,
    id: string,
    address: string,
  ) {
    const unite: Contract = this.smartweave
      .contract(this.uniteAddr)
      .connect(wallet);
    const interaction = {
      function: "registerSchema",
      id,
      address,
    };
    const res = await unite.writeInteraction(interaction);
  }

  /**
   * deploySchema
   *
   * @param {JWKInterface} wallet
   * @param {string} title - Title of the schema
   * @param {schemaState} state - Initial state
   * @return {Schema}
   */
  async deploySchema(
    wallet: JWKInterface,
    title: string,
    state: SchemaState = schemaState,
  ): Promise<Schema> {
    state.title = title;
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
   * getSchema
   *
   * @param {string} id 
   * @return {Schema}
   */
  async getSchema(id: string): Promise<Schema> {
    const unite: Contract = this.smartweave.contract(this.uniteAddr);
    const interaction: any = await unite.viewState({ function: 'getSchema', id});
    const contractAddr = interaction.result.schema.address;
    const contract: Contract = this.smartweave.contract(contractAddr);
    const schema = new Schema(contract, contractAddr);
    return schema;
  }


  /**
   * getSchema
   *
   * @param {string} contractAddr
   * @return {Schema}
   */
  async getSchemaByAddr(contractAddr: string): Promise<Schema> {
    const contract: Contract = this.smartweave.contract(contractAddr);
    const schema = new Schema(contract, contractAddr);
    return schema;
  }


  /**
   *addItem 
   *
   * @param {JWKInterface} wallet
   * @param {string} id - Title of the schema
   * @param {string} field - Field ID
   * @param {number} itemId - Item ID
   * @param {any} value - Value of the Field
   * @return {Metadata}
   */
  async addItem(wallet:JWKInterface, id: string, field: string, itemId: number, value: any) {
  }

  /**
   *set 
   *
   * @param {JWKInterface} wallet
   * @param {string} id - Title of the schema
   * @param {string} field - Field ID
   * @param {any} value - Value of the Field
   * @return {Metadata}
   */
  async set(wallet:JWKInterface, id: string, field: string, value: any) {
  }
 
  /**
   * read
   *
   * @param {string} id - Title of the schema
   * @return {Metadata}
   */
  async read(id: string) {
  }
 
  /**
   * write
   *
   * @param {JWKInterface} wallet
   * @param {string} id - Title of the schema
   * @param {string} schemaId - Schema
   * @param {any} data - Schema release
   * @return {Metadata}
   */
  async write(
    wallet: JWKInterface,
    id: string,
    schemaId: string,
    data: any 
  ): Promise<Metadata> {

    const schema = await this.getSchema(schemaId);
    const schemaState = await schema.readState();
    const state: MetadataState = data as MetadataState;

    state.owner = await this.getAddress(wallet);
    state.id = id;
    state.schema = schemaId;
    state.release = schemaState.releaseId;
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
