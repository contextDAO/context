import { DappContext } from "../types/types";
import getDataPod from "./getDataPod";

/**
 * updateDataPod
 *
 * @param {DappContext} dapp
 * @param {string} dataId
 * @param {string} field 
 * @param {any} value 
 */
export default async function updateDataPod(
    dapp: DappContext,
    dataId: string,
    field: string,
    value: any,
  ) {
  if (!dapp|| !dapp.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }

  // Update DataPod.
  const { contract } = await getDataPod(dapp, dataId);
  const interaction = {
    function: "write",
    field,
    value,
  };
  await contract.writeInteraction(interaction);
}

