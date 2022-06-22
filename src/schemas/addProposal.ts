import { Field , UniteContext } from "../types/types";
import { Contract } from "redstone-smartweave";
import getSchemaContract from "./getSchemaContract";

/**
 * addProposal
 *
 * @param {UniteContext}context 
 * @param {string} id - Title of the schema
 * @param {string} proposalName
 * @param {Field} field
 */
export default async function addProposal(
    context: UniteContext,
    id: string,
    proposalName: string,
    field: Field,
  ) {
  if (!context || !context.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }
  const contract: Contract = await getSchemaContract(context, id);
  const interaction = {
    function: "addProposal",
    proposalName,
    field,
  };
  await contract.writeInteraction(interaction);
}

