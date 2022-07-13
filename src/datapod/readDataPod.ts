import { DappContext, ContextData, DataPodState } from "../types/types";
import getContext from "../context/getContext";
import { Contract } from "redstone-smartweave";
import getDataContract from "./getDataContract";

/**
 * readData
 *
 * @param {DappContext} dapp
 * @param {string} dataId 
 */
export default async function readData(
    dapp: DappContext,
    dataId: string,
) : Promise<DataPodState> {
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
  return state;
}

