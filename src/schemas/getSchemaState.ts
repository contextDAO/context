import { SchemaState, UniteContext } from "../types/types";
import { Contract } from "redstone-smartweave";
import getSchemaContract from "./getSchemaContract"

/**
 * getSchemaState
 *
 * @param {UniteContext} context
 * @param {string} id - Title of the schema
 */
export default async function getSchemaState(context: UniteContext, id: string) {
  // Get schema state.
  const contract: Contract = await getSchemaContract(context, id);
  const initialState = await contract.readState();
  const state: SchemaState = initialState.state as SchemaState;
  return state;
}

