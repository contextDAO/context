import { UniteContext } from "../types/types";
import { Contract } from "redstone-smartweave";
/**
 * getDataContract
 *
 * @param {UniteContext} context
 * @param {string} dataId
 * @return {Contract}
 */
export default function getDataContract(context: UniteContext, dataId: string): Promise<Contract>;
