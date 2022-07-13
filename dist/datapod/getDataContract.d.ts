import { DappContext } from "../types/types";
import { Contract } from "redstone-smartweave";
/**
 * getDataContract
 *
 * @param {DappContext} dapp
 * @param {string} dataId
 * @return {Contract}
 */
export default function getDataContract(dapp: DappContext, dataId: string): Promise<Contract>;
