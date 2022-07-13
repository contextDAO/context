import { SchemaState, DappContext } from "../types/types";
/**
 * deploySchema
 *
 * @param {DappContext} dapp
 * @param {SchemaState} newState
 * @return {string} Schema address
 */
export default function deploySchema(dapp: DappContext, newState?: SchemaState): Promise<string>;
