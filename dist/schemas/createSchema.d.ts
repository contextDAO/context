import { SchemaState, DappContext } from "../types/types";
/**
 * createSchema
 *
 * @param {DappContext} dapp
 * @param {string} schemaId - Title of the schema
 * @param {SchemaState} newState
 */
export default function createSchema(dapp: DappContext, schemaId: string, newState?: SchemaState): Promise<void>;
