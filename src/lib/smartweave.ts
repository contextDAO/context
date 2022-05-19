import { JWKInterface } from 'arweave/node/lib/wallet';
import { UniteSchemaState, Proposal } from '../src/contracts/types/types';
import { mineBlock, GlobalAr } from './arweave';
import { Contract } from 'redstone-smartweave';

export async function writeInteraction(ga: GlobalAr, contractAddr: string, wallet: JWKInterface, interaction: any): Promise<any> {
  const contract = ga.smartweave.contract(contractAddr).connect(wallet);
  await contract.writeInteraction(interaction);
  await mineBlock(ga.arweave);
  const newState = await contract.readState();
  const state:any = newState.state;
  return state;
}

export async function readInteraction(ga: GlobalAr, contractAddr: string, interaction: any): Promise<any> {
  const contract = ga.smartweave.contract(contractAddr);
  const { result } = await contract.viewState(interaction);
  return result;
}

export async function readState(ga: GlobalAr, contractAddr: string, wallet: JWKInterface): Promise<UniteSchemaState> {
  const contract: Contract = ga.smartweave.contract(contractAddr).connect(wallet);
  const initialState = await contract.readState();
  const state: UniteSchemaState = initialState.state as UniteSchemaState;
  return state;
}

export const initialState: UniteSchemaState = {
  "title": "Basic NFT Metadata",
  "description": "STandard NFT metadata",
  "from": {
    "standardId" : "",
    "version" : 0
  },
  "contributorId": 0,
  "proposalId": 0,
  "lastProposal" : -1,
  "openProposal" : -1,
  "major": 0,
  "minor": 0,
  "patch": 0,
  "contributors": [{
    "address": "",
    "role": "editor",
  }],
  "proposals": <Proposal[]>[],
};
