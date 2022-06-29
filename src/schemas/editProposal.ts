import { ProposalStatus, DappContext } from "../types/types";
import { Contract } from "redstone-smartweave";
import getSchemaContract from "./getSchemaContract";

/**
 * addProposal
 *
 * @param {DappContext} dapp 
 * @param {string} id - Title of the schema
 * @param {number} proposalId
 * @param {ProposalStatus} status
 */
export default async function editProposal(
    dapp: DappContext,
    id: string,
    proposalId: number,
    status: ProposalStatus,
  ) {
  if (!dapp || !dapp.wallet) {
    throw(new Error(`You need to init the dapp and connect a wallet first`));
  }
  const contract: Contract = await getSchemaContract(dapp, id);
  const interaction = {
    function: "editProposal",
    proposalId,
    status,
  };
  await contract.writeInteraction(interaction);
}

