import { UniteContext } from "../types/types";
/**
 * writeData
 *
 * @param {UniteContext}context
 * @param {string} schemaId
 * @param {string} dataId
 * @param {object} data
 */
export default function writeData(context: UniteContext, schemaId: string, dataId: string, data: any): Promise<void>;
