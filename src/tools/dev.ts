import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import Arlocal from 'arlocal';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { Unite, Standard } from '../index';

let arlocal: Arlocal;
let unite: Unite;

const main = async () => {
  arlocal = new Arlocal(1984, false);
  await arlocal.start();
  unite = await Unite.init('localhost');
  const walletFile = path.join(__dirname,'wallets', 'wallet_test_1.json');
  const wallet: JWKInterface = JSON.parse(fs.readFileSync(walletFile).toString());
  let walletAddress = await unite.getAddress(wallet);

  await unite.arweave.api.get(`/mint/${walletAddress}/1000000000000000`);
  const standard: Standard = await unite.deployStandard(wallet, 'Base NFT', 'Basic NFT Metadata')
  console.log('Contract deployed to: ' + standard.contractAddr);
}

main();
