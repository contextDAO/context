import { UniteContext } from "../types/types";
import { Contract } from "redstone-smartweave";

/**
 * getDataContract
 *
 * @param {UniteContext} context
 * @param {string} dataId
 * @return {Contract}
 */
export default async function getDataContract(context: UniteContext, dataId: string): Promise<Contract> {
  // Get Schema address.
  const unite: Contract = context.smartweave.contract(context.uniteAddr);
  const interaction: any = await unite.viewState({ function: 'getData', dataId});
  if (!interaction.result.data) {
    throw(new Error(`Invalid Schema Id`));
  }
  const contractAddr = interaction.result.data.address;
  const contract: Contract = context.smartweave.contract(contractAddr);

  // Conect wallet
  if (context.wallet) {
   contract.connect(context.wallet.json);
  }

  return contract;
}

