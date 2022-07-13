import { DappContext, DataPodState, SchemaState, ContextSchema } from "../types/types";
import { dataPodContractSource } from "../contracts/src";
import getContext from "../context/getContext";
import getSchemaState from "../schemas/getSchemaState";

/**
 * deployDataPod 
 *
 * @param {DappContext} dapp
 * @param {string} schemaId
 * @param {object} data
 * @return {string} DataPod address
 */
export default async function deployDataPod(
    dapp: DappContext,
    schemaId: string,
    data: any,
): Promise<string> {
  if (!dapp|| !dapp.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }

  const context = await getContext(dapp);

  // schemaId should exist
  const schema = context.state.schemas.find((s: ContextSchema) => s.schemaId === schemaId);
  if (!schema) throw(new Error(`${schemaId} is not registered`));

  // Create Data Contract.
  const schemaState: SchemaState = await getSchemaState(dapp, schemaId);
  const state: DataPodState = {
    owner: dapp.wallet.address,
    schemaId,
    release: schemaState.releaseId,
    data
  };
  const contractAddr = await dapp.smartweave.createContract.deploy({
    wallet: dapp.wallet.json,
    initState: JSON.stringify(state),
    src: dataPodContractSource,
  });

  return contractAddr;
}

