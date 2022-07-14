import { DappContext, ContextData, DataPodState } from "../types/types";
import getContext from "../context/getContext";
import { Contract } from "redstone-smartweave";
import getDataContract from "./getDataContract";

/**
 * getDataPod
 *
 * @param {DappContext} dapp
 * @param {string} dataId 
 * @return {{DataPodState, Contract}}
 */
export default async function getDataPod(
    dapp: DappContext,
    dataId: string,
) : Promise<{state: DataPodState, contract: Contract}> {
  if (!dapp || !dapp.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }

  const context = await getContext(dapp);

  // dataId should exist
  const registeredData = context.state.data.find((s: ContextData) => s.dataId === dataId);
  if (!registeredData) throw(new Error(`${dataId} is not registered`));

  const contract: Contract = await getDataContract(dapp, dataId);
  const initialState = await contract.readState();
  const state: DataPodState = initialState.state as DataPodState;
  return {state, contract};
}

