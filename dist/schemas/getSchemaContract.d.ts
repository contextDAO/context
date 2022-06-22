import { UniteContext } from "../types/types";
import { Contract } from "redstone-smartweave";
/**
 * getSchemaContract
 *
 * @param {UniteContext} context
 * @param {string} id - Title of the schema
 * @return {Contract}
 */
export default function getSchemaContract(context: UniteContext, id: string): Promise<Contract>;
