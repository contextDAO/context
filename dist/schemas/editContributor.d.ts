import { UniteContext } from "../types/types";
/**
 * editContributor
 *
 * @param {UniteContext} context
 * @param {string} id - Title of the schema
 * @param {string} userAddr - User address
 * @param {string} role - New role
 */
export default function editContributor(context: UniteContext, id: string, userAddr: string, role: string): Promise<void>;
