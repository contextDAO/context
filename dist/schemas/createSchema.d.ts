import { SchemaState, UniteContext } from "../types/types";
/**
 * createSchema
 *
 * @param {UniteContext} context
 * @param {string} schemaId - Title of the schema
 * @param {SchemaState} newState
 */
export default function createSchema(context: UniteContext, schemaId: string, newState?: SchemaState): Promise<void>;
