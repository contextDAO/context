import { DappContext } from "../types/types";
import { Contract } from "redstone-smartweave";

/**
 * getSchemaContract
 *
 * @param {DappContext} dapp
 * @param {string} schemaId - Title of the schema
 * @return {Contract}
 */
export default async function getSchemaContract(dapp: DappContext, schemaId: string): Promise<Contract> {
  // Get Schema address.
  const context: Contract = dapp.smartweave.contract(dapp.contextAddr);
  const interaction: any = await context.viewState({ function: 'getSchema', schemaId});
  if (!interaction.result.schema) {
    throw(new Error(`Invalid Schema Id`));
  }
  const contractAddr = interaction.result.schema.address;
  const contract: Contract = dapp.smartweave.contract(contractAddr);

  // Conect wallet
  if (dapp.wallet) {
   contract.connect(dapp.wallet.json);
  }

  return contract;
}

