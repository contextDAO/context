import { DappContext } from "../types/types";
/**
 * writeData
 *
 * @param {DappContext} dapp
 * @param {string} schemaId
 * @param {string} dataId
 * @param {string} dataAddr
 */
export default function writeData(dapp: DappContext, schemaId: string, dataId: string, dataAddr: string): Promise<void>;
