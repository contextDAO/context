import { Field, UniteContext } from "../types/types";
/**
 * addProposal
 *
 * @param {UniteContext}context
 * @param {string} id - Title of the schema
 * @param {string} proposalName
 * @param {Field} field
 */
export default function addProposal(context: UniteContext, id: string, proposalName: string, field: Field): Promise<void>;
