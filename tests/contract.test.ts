import fs from 'fs';
import ArLocal from 'arlocal';
import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import path from 'path';
import { addFunds, mineBlock } from '../utils/_helpers';
import { UniteSchemaState, Field, Version, Comment } from '../src/contracts/types/types';

import {
  Contract,
  SmartWeave,
  SmartWeaveNodeFactory,
  LoggerFactory,
  InteractionResult,
} from 'redstone-smartweave';

describe('Testing the Profit Sharing Token', () => {
  let contractSrc: string;

  let wallet: JWKInterface;
  let editorAddress: string;
  let contributor: JWKInterface;
  let contributorAddress: string;
  let user: JWKInterface;
  let userAddress: string;

  let arweave: Arweave;
  let arlocal: ArLocal;
  let smartweave: SmartWeave;
  let contract: Contract;
  let contractAddr: string;

  beforeAll(async () => {
    arlocal = new ArLocal(1820);
    await arlocal.start();

    arweave = Arweave.init({
      host: 'localhost',
      port: 1820,
      protocol: 'http',
    });

    LoggerFactory.INST.logLevel('error');

    smartweave = SmartWeaveNodeFactory.memCached(arweave);
    wallet = await arweave.wallets.generate();
    await addFunds(arweave, wallet);
    editorAddress = await arweave.wallets.jwkToAddress(wallet);

    contributor = await arweave.wallets.generate();
    await addFunds(arweave, contributor);
    contributorAddress = await arweave.wallets.jwkToAddress(contributor);

    user = await arweave.wallets.generate();
    await addFunds(arweave, user);
    userAddress = await arweave.wallets.jwkToAddress(user);

    contractSrc = fs.readFileSync(path.join(__dirname, '../dist/contract.js'), 'utf8');

    const initialState: UniteSchemaState = {
      "contributorId": 0,
      "versionId": 0,
      "major": 0,
      "minor": 0,
      "patch": 0,
      "currentVersion" : 0,
      "openVersion" : 0,
      "contributors": [{
        "address": editorAddress,
        "role": "editor",
      }],
      "versions": <Version[]>[],
      "comments": <Comment[]>[]
    };

    contractAddr = await smartweave.createContract.deploy({
      wallet,
      initState: JSON.stringify(initialState),
      src: contractSrc,
    });
    
    contract = smartweave.contract(contractAddr).connect(wallet);
    await mineBlock(arweave);
  });

  afterAll(async () => {
    await arlocal.stop();
  });

  it('should read state and contributors', async () => {
    const initialState = await contract.readState();
    const state:any = initialState.state;
    expect(state.contributors[0].address).toEqual(editorAddress);
    expect(state.contributors[0].role).toEqual("editor");
  });

  it('should add a contributor', async () => {
    contract = smartweave.contract(contractAddr).connect(contributor);
    await contract.writeInteraction({ function: 'addContributor' });
    await mineBlock(arweave);
    let newState = await contract.readState();
    let state:any = newState.state;
    expect(state.contributors.length).toEqual(2);
    expect(state.contributors[1].address).toEqual(contributorAddress);
    expect(state.contributors[1].role).toEqual("user");

    contract = smartweave.contract(contractAddr).connect(wallet);
    await contract.writeInteraction({ function: 'setRole', userAddr: contributorAddress, role: 'contributor' });
    await mineBlock(arweave);
    newState = await contract.readState();
    state = newState.state;
    expect(state.contributors[1].role).toEqual("contributor");
  });

  it('should add a user', async () => {
    contract = smartweave.contract(contractAddr).connect(user);
    await contract.writeInteraction({ function: 'addContributor' });
    await mineBlock(arweave);
    const newState = await contract.readState();
    const state:any = newState.state;
    expect(state.contributors.length).toEqual(3);
    expect(state.contributorId).toEqual(2);
    expect(state.contributors[2].address).toEqual(userAddress);
    expect(state.contributors[2].role).toEqual("user");
  });

  it('should add a new version', async () => {
    contract = smartweave.contract(contractAddr).connect(user);
    await contract.writeInteraction({ function: 'addVersion', name: 'proposal #1', comment: 'test comment' });
    await mineBlock(arweave);
    const newState = await contract.readState();
    const state:any = newState.state;
    console.log('====================================\n', state)
    expect(state.versions.length).toEqual(1);
    expect(state.versionId).toEqual(1);
    expect(state.versions[0].name).toEqual('proposal #1');
    expect(state.versions[0].proposer).toEqual(userAddress);
    expect(state.versions[0].comments[0].by).toEqual(userAddress);
    expect(state.versions[0].comments[0].text).toEqual('test comment');
  });


});
