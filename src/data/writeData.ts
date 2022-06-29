import { DappContext, DataState, SchemaState, ContextSchema, ContextData } from "../types/types";
import { dataContractSource } from "../contracts/src";
import getContext from "../context/getContext";
import getSchemaState from "../schemas/getSchemaState";

/**
 * writeData 
 *
 * @param {DappContext} dapp
 * @param {string} schemaId
 * @param {string} dataId 
 * @param {object} data
 */
export default async function writeData(
    dapp: DappContext,
    schemaId: string,
    dataId: string,
    data: any,
  ) {
  if (!dapp|| !dapp.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }

  const context = await getContext(dapp);

  // dataId should not exist
  const registeredData = context.state.data.find((s: ContextData) => s.dataId === dataId);
  if (registeredData) throw(new Error(`${dataId} is already registered`));

  // schemaId should exist
  const schema = context.state.schemas.find((s: ContextSchema) => s.schemaId === schemaId);
  if (!schema) throw(new Error(`${schemaId} is not registered`));

  const schemaState: SchemaState = await getSchemaState(dapp, schemaId);
  // Create Data Contract.
  const state: DataState = {
    owner: dapp.wallet.address,
    dataId,
    schemaId,
    release: schemaState.releaseId,
    data
  };
  const contractAddr = await dapp.smartweave.createContract.deploy({
    wallet: dapp.wallet.json,
    initState: JSON.stringify(state),
    src: dataContractSource,
  });

  // Register Name.
  const interaction = {
    function: "registerData",
    dataId,
    schemaId,
    address: contractAddr,
  };
  await context.contract.writeInteraction(interaction);
  return contractAddr;
}

