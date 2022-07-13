import { DappContext, DataPodState } from "../types/types";
/**
 * readData
 *
 * @param {DappContext} dapp
 * @param {string} dataId
 */
export default function readData(dapp: DappContext, dataId: string): Promise<DataPodState>;
