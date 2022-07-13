import { DappContext } from "../types/types";
/**
 * deployDataPod
 *
 * @param {DappContext} dapp
 * @param {string} schemaId
 * @param {object} data
 * @return {string} DataPod address
 */
export default function deployDataPod(dapp: DappContext, schemaId: string, data: any): Promise<string>;
