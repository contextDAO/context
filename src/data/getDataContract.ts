import { DappContext } from "../types/types";
import { Contract } from "redstone-smartweave";

/**
 * getDataContract
 *
 * @param {DappContext} dapp
 * @param {string} dataId
 * @return {Contract}
 */
export default async function getDataContract(dapp: DappContext, dataId: string): Promise<Contract> {
  // Get Schema address.
  const context: Contract = dapp.smartweave.contract(dapp.contextAddr);
  const interaction: any = await context.viewState({ function: 'getData', dataId});
  if (!interaction.result.data) {
    throw(new Error(`Invalid Schema Id`));
  }
  const contractAddr = interaction.result.data.address;
  const contract: Contract = dapp.smartweave.contract(contractAddr);

  // Conect wallet
  if (dapp.wallet) {
   contract.connect(dapp.wallet.json);
  }

  return contract;
}

