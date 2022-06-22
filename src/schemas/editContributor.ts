import { UniteContext } from "../types/types";
import { Contract } from "redstone-smartweave";
import getSchemaContract from "./getSchemaContract";

/**
 * editContributor
 *
 * @param {UniteContext} context 
 * @param {string} id - Title of the schema
 * @param {string} userAddr - User address
 * @param {string} role - New role
 */
export default async function editContributor(context: UniteContext, id: string, userAddr: string, role: string) {
  if (!context || !context.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }
  console.log("\n\nTODO : Check schema id is registered\n\n");

  const contract: Contract = await getSchemaContract(context, id);
  const interaction = {
    function: "setRole",
    userAddr,
    role
  };
  await contract.writeInteraction(interaction);
}

