import { UniteContext } from "../types/types";
import { Contract } from "redstone-smartweave";
/**
 * getSchemaContract
 *
 * @param {UniteContext} context
 * @param {string} schemaId - Title of the schema
 * @return {Contract}
 */
export default function getSchemaContract(context: UniteContext, schemaId: string): Promise<Contract>;
