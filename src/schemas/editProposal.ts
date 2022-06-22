import { ProposalStatus, UniteContext } from "../types/types";
import { Contract } from "redstone-smartweave";
import getSchemaContract from "./getSchemaContract";

/**
 * addProposal
 *
 * @param {UniteContext} context 
 * @param {string} id - Title of the schema
 * @param {number} proposalId
 * @param {ProposalStatus} status
 */
export default async function editProposal(
    context: UniteContext,
    id: string,
    proposalId: number,
    status: ProposalStatus,
  ) {
  if (!context || !context.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }
  const contract: Contract = await getSchemaContract(context, id);
  const interaction = {
    function: "editProposal",
    proposalId,
    status,
  };
  await contract.writeInteraction(interaction);
}

