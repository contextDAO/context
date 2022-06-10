import { JWKInterface } from "arweave/node/lib/wallet";
import { MetadataState } from "../contracts/Metadata/types/types";
import { Contract } from "redstone-smartweave";

/**
 * Class Metadata - interactions with the metadata contract.
 */
export default class Metadata {
  wallet: JWKInterface;
  contract: Contract;
  contractAddr: string;

  /**
   * @constructor
   *
   * @param {JWKInterface} wallet - Connected wallet
   * @param {Contract} contract - Interface to the contract
   * @param {string} contractAddr - Contract Address
   */
  constructor(wallet: JWKInterface, contract: Contract, contractAddr: string) {
    this.wallet = wallet;
    this.contract = contract;
    this.contractAddr = contractAddr;
  }

  /**
   * readState
   *
   * @return {MetadataState}
   */
  async readState(): Promise<MetadataState> {
    const initialState = await this.contract.readState();
    const state: MetadataState =
      initialState.state as MetadataState;
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
}
