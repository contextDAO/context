import { UniteContext } from "../types/types";
/**
 * createSchema
 *
 * @param {UniteContext} context
 * @param {string} id - Title of the schema
 * @param {string} schemaId - Schema
 * @param {any} data - Schema release
 */
export default function writeData(context: UniteContext, id: string, schemaId: string, data: any): Promise<string>;
