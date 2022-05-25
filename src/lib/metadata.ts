import { JWKInterface } from 'arweave/node/lib/wallet';
import { MetadataSchemaState } from '../contracts/types/metadataTypes';
import { Contract } from 'redstone-smartweave';

/*
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
   */
  constructor(wallet: JWKInterface, contract: Contract, contractAddr: string) {
    this.wallet = wallet;
    this.contract = contract;
    this.contractAddr = contractAddr;
  }

  /**
   * readState
   *
   * @returns {MetadataSchemaState}
   */
  async readState(): Promise<MetadataSchemaState> {
    const initialState = await this.contract.readState();
    const state: MetadataSchemaState = initialState.state as MetadataSchemaState;
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
    await this.contract.writeInteraction({ function: 'addContributor' });
  }
}
