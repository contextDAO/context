import { DappContext } from "../types/types";
/**
 * editContributor
 *
 * @param {DappContext} dapp
 * @param {string} id - Title of the schema
 * @param {string} userAddr - User address
 * @param {string} role - New role
 */
export default function editContributor(dapp: DappContext, id: string, userAddr: string, role: string): Promise<void>;
