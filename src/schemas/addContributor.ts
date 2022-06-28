import { SchemaState, UniteContext } from "../types/types";
import { schema } from "../utils/defaultState";
import { Contract } from "redstone-smartweave";
import getSchemaContract from "./getSchemaContract";

/**
 * addContributor
 *
 * @param {UniteContext}context 
 * @param {string} schemaId - Title of the schema
 */
export default async function addContributor(context: UniteContext, schemaId: string) {
  if (!context || !context.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }
  const contract: Contract = await getSchemaContract(context, schemaId);
  await contract.writeInteraction({ function: "addContributor" });
}

