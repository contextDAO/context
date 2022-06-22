import { SchemaState, UniteContext } from "../types/types";
/**
 * getSchemaState
 *
 * @param {UniteContext} context
 * @param {string} id - Title of the schema
 */
export default function getSchemaState(context: UniteContext, id: string): Promise<SchemaState>;
