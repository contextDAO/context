import { ProposalStatus, DappContext } from "../types/types";
/**
 * addProposal
 *
 * @param {DappContext} dapp
 * @param {string} id - Title of the schema
 * @param {number} proposalId
 * @param {ProposalStatus} status
 */
export default function editProposal(dapp: DappContext, id: string, proposalId: number, status: ProposalStatus): Promise<void>;
