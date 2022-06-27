import { JWKInterface } from "arweave/node/lib/wallet";
import { DataState } from "../contracts/Data/types/types";
import { Contract } from "redstone-smartweave";

/**
 * Class Data - interactions with the metadata contract.
 */
export default class Data {
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
   * @return {DataState}
   */
  async readState(): Promise<DataState> {
    const initialState = await this.contract.readState();
    const state: DataState =
      initialState.state as DataState;
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
   * set - Sets the Value for a Field
   *
   * @param {string} field 
   * @param {any} value
   */
  async set(field:string,value: any) {
    const interaction = {
      function: "set",
      field,
      value
    };
    await this.contract.writeInteraction(interaction);
  }

  /**
   * set - Sets the Value for a Field
   *
   * @param {string} field 
   * @param {any} item
   * @param {number} id 
   */
  async addItem(field:string,item: any, id: number) {
    const interaction = {
      function: "addItem",
      field,
      item,
      id
    };
    await this.contract.writeInteraction(interaction);
  }

  /**
   * get - Get the Value of a Field
   *
   * @param {string} field 
   * @param {number | null} id 
   * @return {any}
   */
  async get(field:string, id: number | null = null): Promise<any> {
    const interaction = { function: "get", field, id };
    const result: any = await this.contract.viewState(interaction);
    return result.result.value;
  }
}
