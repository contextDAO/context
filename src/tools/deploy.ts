import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { UniteSchemaState, Proposal } from '../contracts/types/types';
import {
  SmartWeave,
  SmartWeaveNodeFactory,
  LoggerFactory,
} from 'redstone-smartweave';

const connections = {
  localhost: { host: 'localhost', port: 1984, protocol: 'http' },
  testnet: { host: 'testnet.redstone.tools', port: 443, protocol: 'https' }
}

const main = async (network: any, walletFile: string) => {

  if (!network || !walletFile) {
    console.log('Usage: node deploy.js --network=local|testnet|arweave --wallet=<json_wallet_file>');
    process.exit();
  }

  let arweave: Arweave;
  let smartweave: SmartWeave;
  let contractSrc: string;
  let wallet: JWKInterface;
  let editorAddress: string;

  const connection = (network === 'localhost') ? connections.localhost : connections.testnet;
  arweave = Arweave.init(connection);

  wallet = JSON.parse(fs.readFileSync(walletFile).toString());
  const address = await arweave.wallets.jwkToAddress(wallet)

  const initialState: UniteSchemaState = {
    "title" : "Basic NFT",
    "description": "Metadata standard for a Basic NFT",
    "contributorId": 0,
    "proposalId": 0,
    "lastProposal" : -1,
    "openProposal" : -1,
    "major": 0,
    "minor": 0,
    "patch": 0,
    "contributors": [{
      "address": address,
      "role": "editor",
    }],
    "proposals": <Proposal[]>[],
  };
  LoggerFactory.INST.logLevel('error');
  smartweave = SmartWeaveNodeFactory.memCached(arweave);
  contractSrc = fs.readFileSync(path.join(__dirname, '../../dist/contract.js'),'utf8');
  const contractTxId = await smartweave.createContract.deploy({
    wallet,
    initState: JSON.stringify(initialState),
    src: contractSrc,
  });

  console.log('Contract deployed to: ' + contractTxId);
}

const argv = minimist(process.argv.slice(1));
main(argv.network, argv.wallet);
