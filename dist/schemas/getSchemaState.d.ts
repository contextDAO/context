import { SchemaState, DappContext } from "../types/types";
/**
 * getSchemaState
 *
 * @param {DappContext} dapp
 * @param {string} schemaId - Title of the schema
 */
export default function getSchemaState(dapp: DappContext, schemaId: string): Promise<SchemaState>;
