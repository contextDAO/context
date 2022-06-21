import { SchemaState, UniteContext } from "../types/types";
import { Contract } from "redstone-smartweave";

/**
 * getSchema
 *
 * @param {UniteContext} context
 * @param {string} id - Title of the schema
 */
export default async function getSchema(context: UniteContext, id: string) {
  // Get Schema address.
  const unite: Contract = context.smartweave.contract(context.uniteAddr);
  const interaction: any = await unite.viewState({ function: 'getSchema', id});
  if (!interaction.result.schema) {
    throw(new Error(`Invalid Schema Id`));
  }

  // Get schema state.
  const contractAddr = interaction.result.schema.address;
  const contract: Contract = context.smartweave.contract(contractAddr);
  const initialState = await contract.readState();
  const state: SchemaState = initialState.state as SchemaState;
  return state;
}

