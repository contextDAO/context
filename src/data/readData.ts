import { Field , UniteContext } from "../types/types";
import { Contract } from "redstone-smartweave";
import getSchemaContract from "../schemas/getSchemaContract";

/**
 * readData
 *
 * @param {UniteContext}context 
 * @param {string} schemaId
 * @param {string} dataId 
 * @param {object} data
 */
export default async function writeData(
    context: UniteContext,
    schemaId: string,
    dataId: string,
    data: any,
  ) {
  if (!context || !context.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }
  const contract: Contract = await getSchemaContract(context, dataId);
  const interaction = {
    function: "addProposal",
    schemaId,
    dataId,
    data
  };
  await contract.writeInteraction(interaction);
}

