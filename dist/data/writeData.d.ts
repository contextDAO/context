import { DappContext } from "../types/types";
/**
 * writeData
 *
 * @param {DappContext} dapp
 * @param {string} schemaId
 * @param {string} dataId
 * @param {object} data
 */
export default function writeData(dapp: DappContext, schemaId: string, dataId: string, data: any): Promise<string>;
