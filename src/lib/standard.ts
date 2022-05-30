import { JWKInterface } from "arweave/node/lib/wallet";
import { UniteSchemaState, Field } from "../contracts/types/standardTypes";
import { Contract } from "redstone-smartweave";

type Role = "user" | "contributor" | "editor";
type FieldType = "text" | "number" | "boolean";
type ProposalStatus = "proposal" | "open" | "approved" | "abandoned";
type UpdateVersion = "" | "major" | "minor" | "patch";

/**
 * Class Standard - interactions with the standard contract.
 */
export default class Standard {
  wallet: JWKInterface | null;
  contract: Contract;
  contractAddr: string;

  /**
   * @constructor
   *
   * @param {Contract} contract - Interface to the contract
   * @param {string} contractAddr - Contract Address
   */
  constructor(contract: Contract, contractAddr: string) {
    this.wallet = null;
    this.contract = contract;
    this.contractAddr = contractAddr;
  }

  /**
   * readState
   *
   * @return {UniteSchemaState}
   */
  async readState(): Promise<UniteSchemaState> {
    const initialState = await this.contract.readState();
    const state: UniteSchemaState = initialState.state as UniteSchemaState;
    return state;
  }

  /**
   * connect
   *
   * @param {JWKInterface} wallet - Connected wallet
   */
  async connect(wallet: JWKInterface) {
    this.wallet = wallet;
    this.contract.connect(wallet);
  }

  /**
   * register
   *
   * @param {JWKInterface} wallet - Connected wallet
   */
  async register(wallet: JWKInterface) {
    await this.connect(wallet);
    await this.contract.writeInteraction({ function: "addContributor" });
  }

  /**
   * setRole - Updates the role of an address (wallet must be 'editor')
   *
   * @param {Role} role - can be 'user', 'editor' or 'contributor'
   * @param {string} userAddr - Address to change the role from
   */
  async setRole(role: Role, userAddr: string) {
    const interaction = { function: "setRole", userAddr, role };
    await this.contract.writeInteraction(interaction);
  }

  /**
   * addProposal - new proposal in the standard
   *
   * @param {string} proposalName
   * @param {string} comment
   * @param {string} name - Field Name
   * @param {string} description - Field Description
   * @param {FieldType} type - Field Type
   * @param {boolean} isReadOnly - The field is Read Only
   * @param {boolean} isRequired - The Field is required
   */
  async addProposal(
    proposalName: string,
    comment: string,
    name: string,
    description: string,
    type: FieldType,
    isReadOnly: boolean,
    isRequired: boolean
  ) {
    const field: Field = { name, description, type, isReadOnly, isRequired };
    const interaction = {
      function: "addProposal",
      proposalName,
      comment,
      field,
    };
    await this.contract.writeInteraction(interaction);
  }

  /**
   * addComment
   *
   * @param {number} proposalId
   * @param {string} text
   */
  async addComment(proposalId: number, text: string) {
    const interaction = { function: "addComment", proposalId, text };
    await this.contract.writeInteraction(interaction);
  }

  /**
   * updateProposal
   *
   * @param {number} proposalId
   * @param {ProposalStatus} status
   * @param {UpdateVersion} update - Can be major, minor or patch.
   */
  async updateProposal(
    proposalId: number,
    status: ProposalStatus,
    update: UpdateVersion = ""
  ) {
    const interaction = {
      function: "updateProposal",
      proposalId,
      status,
      update,
    };
    await this.contract.writeInteraction(interaction);
  }

  /**
   * getSchema
   *
   * @return {any}
   */
  async getSchema(): Promise<any> {
    const interaction = { function: "getSchema" };
    const result: any = await this.contract.viewState(interaction);
    return result.result.schema;
  }
}
