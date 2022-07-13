import { DappContext } from "../types/types";
/**
 * registerSchema
 *
 * @param {DappContext} dapp
 * @param {string} schemaId
 * @param {string} schemaAddr
 */
export default function registerSchema(dapp: DappContext, schemaId: string, schemaAddr: string): Promise<void>;
