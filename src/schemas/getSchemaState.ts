import { SchemaState, UniteContext } from "../types/types";
import { Contract } from "redstone-smartweave";
import getSchemaContract from "./getSchemaContract"

/**
 * getSchemaState
 *
 * @param {UniteContext} context
 * @param {string} schemaId - Title of the schema
 */
export default async function getSchemaState(context: UniteContext, schemaId: string) {
  // Get schema state.
  const contract: Contract = await getSchemaContract(context, schemaId);
  const initialState = await contract.readState();
  const state: SchemaState = initialState.state as SchemaState;
  return state;
}

