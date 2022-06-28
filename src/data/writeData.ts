import { UniteContext, UniteState, DataState } from "../types/types";
import { schema } from "../utils/defaultState";
import { dataContractSource } from "../contracts/src";
import { Contract } from "redstone-smartweave";
import getUnite from "../context/getUnite";
import getSchemaState from "../schemas/getSchemaState";
import getSchemaContract from "../schemas/getSchemaContract";

/*
  {state: UniteState, unite: Contract} = await getUnite(context);

  // id should not exist
  const uniteData = state.data.find(s => s.id === id);
  if (uniteData) throw(new Error(`${id} is already registered`));

  // schema should exist
  const uniteSchema = uniteState.schemas.find(s => s.id === schemaId);
  if (!uniteSchema) throw(new Error(`Schema "${schemaId}" does not exist`));
  const uniteSchemaState = await getSchemaState(context, schemaId);

  // Create Data Contract.
  const state: DataState = data as DataState;
  state.owner = context.wallet.address;
  state.id = id;
  state.schema = schemaId;
  state.release = uniteSchemaState.releaseId;
  const contractAddr = await context.smartweave.createContract.deploy({
    wallet: context.wallet.json,
    initState: JSON.stringify(state),
    src: dataContractSource,
  });

  // Register Name.
  const interaction = {
    function: "registerData",
    id,
    schema: schemaId,
    address: contractAddr,
  };
  await unite.writeInteraction(interaction);
  return contractAddr;
 */

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
  const contract: Contract = await getSchemaContract(context, dataId);
  const interaction = {
    function: "addProposal",
    schemaId,
    dataId,
    data
  };
  await contract.writeInteraction(interaction);
}

