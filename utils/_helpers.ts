import Arweave from 'arweave';
import ArLocal from 'arlocal';
import { SmartWeave } from 'redstone-smartweave';
import { JWKInterface } from 'arweave/node/lib/wallet';

export async function addFunds(arweave: Arweave, wallet: JWKInterface) {
  const walletAddress = await arweave.wallets.getAddress(wallet);
  await arweave.api.get(`/mint/${walletAddress}/1000000000000000`);
}

export async function mineBlock(arweave: Arweave) {
  await arweave.api.get('mine');
}

export type GlobalAr = {
  arlocal: ArLocal;
  smartweave: SmartWeave;
  arweave: Arweave;
  contractAddr: string;
}
  
export async function writeInteraction(ga: GlobalAr, wallet: JWKInterface, interaction: any): Promise<any> {
  const contract = ga.smartweave.contract(ga.contractAddr).connect(wallet);
  await contract.writeInteraction(interaction);
  await mineBlock(ga.arweave);
  const newState = await contract.readState();
  const state:any = newState.state;
  return state;
}

export async function readInteraction(ga: GlobalAr, interaction: any): Promise<any> {
  const contract = ga.smartweave.contract(ga.contractAddr);
  const { result } = await contract.viewState(interaction);
  return result;
}

