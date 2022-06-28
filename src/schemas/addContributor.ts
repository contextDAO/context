import { SchemaState, UniteContext } from "../types/types";
import { schema } from "../utils/defaultState";
import { Contract } from "redstone-smartweave";
import getSchemaContract from "./getSchemaContract";

/**
 * addContributor
 *
 * @param {UniteContext}context 
 * @param {string} id - Title of the schema
 */
export default async function addContributor(context: UniteContext, id: string) {
  if (!context || !context.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }
  console.log("\n\nTODO : Check schema id is registered\n\n");

  const contract: Contract = await getSchemaContract(context, id);
  await contract.writeInteraction({ function: "addContributor" });
}

