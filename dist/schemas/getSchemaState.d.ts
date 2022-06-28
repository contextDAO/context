import { SchemaState, UniteContext } from "../types/types";
/**
 * getSchemaState
 *
 * @param {UniteContext} context
 * @param {string} schemaId - Title of the schema
 */
export default function getSchemaState(context: UniteContext, schemaId: string): Promise<SchemaState>;
