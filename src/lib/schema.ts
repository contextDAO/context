import { JWKInterface } from "arweave/node/lib/wallet";
import { SchemaState, Field, UserRole, ProposalStatus } from "../contracts/Schema/types/types";
import { Contract } from "redstone-smartweave";

/**
 * Class Schema - interactions with the standard contract.
 */
export default class Schema {
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
   * @return {SchemaState}
   */
  async readState(): Promise<SchemaState> {
    const initialState = await this.contract.readState();
    const state: SchemaState = initialState.state as SchemaState;
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
  async setRole(role: UserRole, userAddr: string) {
    const interaction = { function: "setRole", userAddr, role };
    await this.contract.writeInteraction(interaction);
  }

  /**
   * addProposal - new proposal in the standard
   *
   * @param {string} proposalName
   * @param {Field} field - Field for the proposal
   */
  async addProposal(
    proposalName: string,
    field: Field
  ) {
    const interaction = {
      function: "addProposal",
      proposalName,
      field,
    };
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
    status: ProposalStatus
  ) {
    const interaction = {
      function: "updateProposal",
      proposalId,
      status,
    };
    await this.contract.writeInteraction(interaction);
  }
}