import { UniteContext, DataState, SchemaState, UniteSchema, UniteData } from "../types/types";
import { dataContractSource } from "../contracts/src";
import getUnite from "../context/getUnite";
import getSchemaState from "../schemas/getSchemaState";

/**
 * writeData 
 *
 * @param {UniteContext}context 
 * @param {string} schemaId
 * @param {string} dataId 
 * @param {object} data
 */
export default async function writeData(
    context: UniteContext,
    schemaId: string,
    dataId: string,
    data: any,
  ) {
  if (!context || !context.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }

  const unite = await getUnite(context);

  // dataId should not exist
  const registeredData = unite.state.data.find((s: UniteData) => s.dataId === dataId);
  if (registeredData) throw(new Error(`${dataId} is already registered`));

  // schemaId should exist
  const schema = unite.state.schemas.find((s: UniteSchema) => s.schemaId === schemaId);
  if (!schema) throw(new Error(`${schemaId} is not registered`));

  const schemaState: SchemaState = await getSchemaState(context, schemaId);
  // Create Data Contract.
  const state: DataState = {
    owner: context.wallet.address,
    dataId,
    schemaId,
    release: schemaState.releaseId,
    data
  };
  const contractAddr = await context.smartweave.createContract.deploy({
    wallet: context.wallet.json,
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
  await unite.contract.writeInteraction(interaction);
  return contractAddr;
}

