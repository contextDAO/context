import { Field , DappContext } from "../types/types";
import { Contract } from "redstone-smartweave";
import getSchemaContract from "./getSchemaContract";

/**
 * addProposal
 *
 * @param {DappContext}dapp 
 * @param {string} id - Title of the schema
 * @param {string} proposalName
 * @param {Field} field
 */
export default async function addProposal(
    dapp: DappContext,
    id: string,
    proposalName: string,
    field: Field,
  ) {
  if (!dapp || !dapp.wallet) {
    throw(new Error(`You need to init the dapp and connect a wallet first`));
  }
  const contract: Contract = await getSchemaContract(dapp, id);
  const interaction = {
    function: "addProposal",
    proposalName,
    field,
  };
  await contract.writeInteraction(interaction);
}

