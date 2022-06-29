import { SchemaState, DappContext } from "../types/types";
import { Contract } from "redstone-smartweave";
import getSchemaContract from "./getSchemaContract"

/**
 * getSchemaState
 *
 * @param {DappContext} dapp
 * @param {string} schemaId - Title of the schema
 */
export default async function getSchemaState(dapp: DappContext, schemaId: string) {
  // Get schema state.
  const contract: Contract = await getSchemaContract(dapp, schemaId);
  const initialState = await contract.readState();
  const state: SchemaState = initialState.state as SchemaState;
  return state;
}

