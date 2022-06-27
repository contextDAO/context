import { UniteContext } from "../types/types";
import { Contract } from "redstone-smartweave";

/**
 * getSchemaContract
 *
 * @param {UniteContext} context
 * @param {string} schemaId - Title of the schema
 * @return {Contract}
 */
export default async function getSchemaContract(context: UniteContext, schemaId: string): Promise<Contract> {
  // Get Schema address.
  const unite: Contract = context.smartweave.contract(context.uniteAddr);
  const interaction: any = await unite.viewState({ function: 'getSchema', schemaId});
  if (!interaction.result.schema) {
    throw(new Error(`Invalid Schema Id`));
  }
  const contractAddr = interaction.result.schema.address;
  const contract: Contract = context.smartweave.contract(contractAddr);

  // Conect wallet
  if (context.wallet) {
   contract.connect(context.wallet.json);
  }

  return contract;
}

