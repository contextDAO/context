import { DappContext, DataState } from "../types/types";
/**
 * readData
 *
 * @param {DappContext} dapp
 * @param {string} dataId
 */
export default function readData(dapp: DappContext, dataId: string): Promise<DataState>;
