import { DappContext, DataPodState } from "../types/types";
import { Contract } from "redstone-smartweave";
/**
 * getDataPod
 *
 * @param {DappContext} dapp
 * @param {string} dataId
 * @return {{DataPodState, Contract}}
 */
export default function getDataPod(dapp: DappContext, dataId: string): Promise<{
    state: DataPodState;
    contract: Contract;
}>;
