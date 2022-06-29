import { UniteContext, UniteData, DataState } from "../types/types";
import getUnite from "../context/getUnite";
import { Contract } from "redstone-smartweave";
import getDataContract from "./getDataContract";

/**
 * readData
 *
 * @param {UniteContext}context 
 * @param {string} dataId 
 */
export default async function readData(
    context: UniteContext,
    dataId: string,
) : Promise<DataState> {
  if (!context || !context.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }

  const unite = await getUnite(context);

  // dataId should not exist
  const registeredData = unite.state.data.find((s: UniteData) => s.dataId === dataId);
  if (!registeredData) throw(new Error(`${dataId} is not registered`));

  const contract: Contract = await getDataContract(context, dataId);
  const initialState = await contract.readState();
  const state: DataState = initialState.state as DataState;
  return state;
}

