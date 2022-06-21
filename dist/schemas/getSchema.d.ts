import { SchemaState, UniteContext } from "../types/types";
/**
 * getSchema
 *
 * @param {UniteContext} context
 * @param {string} id - Title of the schema
 */
export default function getSchema(context: UniteContext, id: string): Promise<SchemaState>;
