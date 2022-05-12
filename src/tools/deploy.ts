import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import ArLocal from 'arlocal';
import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { UniteSchemaState, Field, Proposal } from '../contracts/types/types';
import {
  Contract,
  SmartWeave,
  SmartWeaveNodeFactory,
  LoggerFactory,
  InteractionResult,
} from 'redstone-smartweave';

const main = async (network: string, walletFile: string) => {

  if (!network || !walletFile) {
    console.log('Usage: node deploy.js --network=local|testnet|arweave --wallet=<json_wallet_file>');
    process.exit();
  }

  let arweave: Arweave;
  let smartweave: SmartWeave;
  let contractSrc: string;
  let wallet: JWKInterface;
  let editorAddress: string;

  arweave = Arweave.init({
    host: 'localhost',
    port: 1984,
    protocol: 'http',
  });

  wallet = JSON.parse(fs.readFileSync(walletFile).toString());
  const address = await arweave.wallets.jwkToAddress(wallet)

  const initialState: UniteSchemaState = {
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
    "fields": <Field[]>[],
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
