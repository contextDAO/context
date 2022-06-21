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
import { SchemaState, Field, ProposalStatus } from "../contracts/Schema/types/types";
import Metadata from "./metadata";
import { MetadataState } from "../contracts/Metadata/types/types";
import {
  schemaContractSource,
  metadataContractSource,
  uniteContractSource,
} from "../contracts/src";
import { getAddress } from "../utils/local";

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
   * deployUnite
   *
   * @param {JWKInterface} wallet
   * @return {string}
   */
  async deployUnite(
    wallet: JWKInterface,
  ): Promise<string> {
    const state: UniteState = uniteState;
    state.owner = await getAddress(this.arweave, wallet);
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
   * createSchema
   *
   * @param {JWKInterface} wallet
   * @param {string} id - Title of the schema
   * @param {schemaState} state - Initial state
   */
  async createSchema(
    wallet: JWKInterface,
    id: string,
    state: SchemaState = schemaState,
  ) {
    state.id = id;
    state.contributors[0].address = await getAddress(this.arweave, wallet);
    const contractAddr = await this.smartweave.createContract.deploy({
      wallet,
      initState: JSON.stringify(state),
      src: schemaContractSource,
    });
    const unite: Contract = this.smartweave
      .contract(this.uniteAddr)
      .connect(wallet);
    const interaction = {
      function: "registerSchema",
      id,
      address: contractAddr,
    };
    await unite.writeInteraction(interaction);
  }

  /**
   * getSchemaAddress
   *
   * @param {string} id - Schema ID
   * @return {string}
   */
  async getSchemaAddress(id: string): Promise<string> {
    const unite: Contract = this.smartweave.contract(this.uniteAddr);
    const interaction: any = await unite.viewState({ function: 'getSchema', id});
    const contractAddr = interaction.result.schema.address;
    return contractAddr;
  }

  /**
   * getDataAddress
   *
   * @param {string} id - Schema ID
   * @return {string}
   */
  async getDataAddress(id: string): Promise<string> {
    const unite: Contract = this.smartweave.contract(this.uniteAddr);
    const interaction: any = await unite.viewState({ function: 'getData', id});
    console.log(interaction);
    const contractAddr = interaction.result.data.address;
    return contractAddr;
  }


  /**
   * getContract
   *
   * @param {JWKInterface} wallet
   * @param {string} id - Title of the schema
   * @return {Contract}
   */
  async getContract(wallet: JWKInterface, id: string): Promise<Contract> {
    const contractAddr = await this.getSchemaAddress(id);
    const contract: Contract = this.smartweave.contract(contractAddr);
    contract.connect(wallet);
    return contract;
  }

  /**
   * getSchema
   *
   * @param {string} id 
   * @return {SchemaState}
   */
  async getSchema(id: string): Promise<SchemaState> {
    const unite: Contract = this.smartweave.contract(this.uniteAddr);
    const interaction: any = await unite.viewState({ function: 'getSchema', id});
    const contractAddr = interaction.result.schema.address;
    const contract: Contract = this.smartweave.contract(contractAddr);
    const initialState = await contract.readState();
    const state: SchemaState = initialState.state as SchemaState;
    return state;
  }


  /**
   * addContributor
   *
   * @param {JWKInterface} wallet
   * @param {string} id - Title of the schema
   */
  async addContributor(wallet: JWKInterface, id: string) {
    const contract = await this.getContract(wallet, id);
    await contract.writeInteraction({ function: "addContributor" });
  }

  /**
   * editContributor
   *
   * @param {JWKInterface} wallet
   * @param {string} id - Title of the schema
   * @param {string} userAddr - Contributor's address
   * @param {string} role
   */
  async editContributor(wallet: JWKInterface, id: string, userAddr: string, role: string) {
    const contract = await this.getContract(wallet, id);
    const interaction = { function: "setRole", userAddr, role };
    await contract.writeInteraction(interaction);
  }

  /**
   * geDefinition
   *
   * @param {SchemaState} state - State of the schema
   * @return {string}
   */
  async getDefinition(state: SchemaState): Promise<string> {
    let definition: string = ``;
    definition += `type ${state.id} {\n`;
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
   * addProposal - new proposal in the standard
   *
   * @param {JWKInterface} wallet
   * @param {string} id - Title of the schema
   * @param {string} proposalName
   * @param {Field} field - Field for the proposal
   */
  async addProposal(
    wallet: JWKInterface,
    id: string,
    proposalName: string,
    field: Field
  ) {
    const contract = await this.getContract(wallet, id);
    const interaction = {
      function: "addProposal",
      proposalName,
      field,
    };
    await contract.writeInteraction(interaction);
  }

  /**
   * editProposal
   *
   * @param {JWKInterface} wallet
   * @param {string} id - Title of the schema
   * @param {number} proposalId
   * @param {ProposalStatus} status
   */
  async editProposal(
    wallet: JWKInterface,
    id: string,
    proposalId: number,
    status: ProposalStatus
  ) {
    const contract = await this.getContract(wallet, id);
    const interaction = {
      function: "updateProposal",
      proposalId,
      status,
    };
    await contract.writeInteraction(interaction);
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
   * @return {MetadataState}
   */
  async read(id: string): Promise<MetadataState> {
    const contractAddr = await this.getDataAddress(id);
    const contract: Contract = this.smartweave.contract(contractAddr);
    const initialState = await contract.readState();
    const state: MetadataState = initialState.state as MetadataState;
    // Get Field
    // const interaction = { function: "get", field, id };
    // const result: any = await this.contract.viewState(interaction);
    return state;
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
    const state: MetadataState = data as MetadataState;

    state.owner = await getAddress(this.arweave, wallet);
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
}
