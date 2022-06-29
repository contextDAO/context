import { UniteContext, DataState } from "../types/types";
/**
 * readData
 *
 * @param {UniteContext}context
 * @param {string} dataId
 */
export default function readData(context: UniteContext, dataId: string): Promise<DataState>;
