import path from 'path';
import fs from 'fs';
import Arweave from 'arweave';
import ArLocal from 'arlocal';
import { Contract, SmartWeave, SmartWeaveNodeFactory, LoggerFactory } from 'redstone-smartweave';
import { JWKInterface } from 'arweave/node/lib/wallet';

export type GlobalAr = {
  arlocal: ArLocal;
  smartweave: SmartWeave;
  arweave: Arweave;
  wallet: JWKInterface;
  editorAddress: string;
  contributor: JWKInterface;
  contributorAddress: string;
  user: JWKInterface;
  userAddress: string;
  contractSrc: string;
  contract: Contract;
  contractChild: Contract;
  contractAddr: string;
  contractAddrChild: string;
}

export async function init(): Promise<GlobalAr> {
  const ga: GlobalAr = {} as GlobalAr;
  ga.arlocal = new ArLocal(1820);
  await ga.arlocal.start();
  ga.arweave = Arweave.init({ host: 'localhost', port: 1820, protocol: 'http' });
  ga.smartweave = SmartWeaveNodeFactory.memCached(ga.arweave);
  LoggerFactory.INST.logLevel('error');
  ga.contractSrc = fs.readFileSync(path.join(__dirname, '../dist/standard.js'), 'utf8');

  // Editor.
  ga.wallet = await ga.arweave.wallets.generate();
  await addFunds(ga.arweave, ga.wallet);
  ga.editorAddress = await ga.arweave.wallets.jwkToAddress(ga.wallet);

  // Contributor.
  ga.contributor = await ga.arweave.wallets.generate();
  await addFunds(ga.arweave, ga.contributor);
  ga.contributorAddress = await ga.arweave.wallets.jwkToAddress(ga.contributor);

  // User
  ga.user = await ga.arweave.wallets.generate();
  await addFunds(ga.arweave, ga.user);
  ga.userAddress = await ga.arweave.wallets.jwkToAddress(ga.user);

  return ga;
}

export async function addFunds(arweave: Arweave, wallet: JWKInterface) {
  const walletAddress = await arweave.wallets.getAddress(wallet);
  await arweave.api.get(`/mint/${walletAddress}/1000000000000000`);
}

export async function mineBlock(arweave: Arweave) {
  await arweave.api.get('mine');
}


