import { ProposalStatus, UniteContext } from "../types/types";
/**
 * addProposal
 *
 * @param {UniteContext} context
 * @param {string} id - Title of the schema
 * @param {number} proposalId
 * @param {ProposalStatus} status
 */
export default function editProposal(context: UniteContext, id: string, proposalId: number, status: ProposalStatus): Promise<void>;
