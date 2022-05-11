import fs from 'fs';
import ArLocal from 'arlocal';
import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import path from 'path';
import { addFunds, mineBlock, GlobalAr, writeInteraction } from '../utils/_helpers';
import { UniteSchemaState, Field, Proposal, Comment } from '../src/contracts/types/types';
import { Contract, SmartWeave, SmartWeaveNodeFactory, LoggerFactory } from 'redstone-smartweave';

describe('Testing the Unite DAO Contract', () => {
  let contractSrc: string;

  let wallet: JWKInterface;
  let editorAddress: string;
  let contributor: JWKInterface;
  let contributorAddress: string;
  let user: JWKInterface;
  let userAddress: string;

  let ga: GlobalAr = {} as GlobalAr;

  let contract: Contract;

  beforeAll(async () => {
    ga.arlocal = new ArLocal(1820);
    await ga.arlocal.start();

    ga.arweave = Arweave.init({
      host: 'localhost',
      port: 1820,
      protocol: 'http',
    });

    LoggerFactory.INST.logLevel('error');

    ga.smartweave = SmartWeaveNodeFactory.memCached(ga.arweave);
    wallet = await ga.arweave.wallets.generate();
    await addFunds(ga.arweave, wallet);
    editorAddress = await ga.arweave.wallets.jwkToAddress(wallet);

    contributor = await ga.arweave.wallets.generate();
    await addFunds(ga.arweave, contributor);
    contributorAddress = await ga.arweave.wallets.jwkToAddress(contributor);

    user = await ga.arweave.wallets.generate();
    await addFunds(ga.arweave, user);
    userAddress = await ga.arweave.wallets.jwkToAddress(user);

    contractSrc = fs.readFileSync(path.join(__dirname, '../dist/contract.js'), 'utf8');

    const initialState: UniteSchemaState = {
      "contributorId": 0,
      "proposalId": 0,
      "lastProposal" : -1,
      "openProposal" : -1,
      "major": 0,
      "minor": 0,
      "patch": 0,
      "contributors": [{
        "address": editorAddress,
        "role": "editor",
      }],
      "proposals": <Proposal[]>[],
    };

    ga.contractAddr = await ga.smartweave.createContract.deploy({
      wallet,
      initState: JSON.stringify(initialState),
      src: contractSrc,
    });
    
    contract = ga.smartweave.contract(ga.contractAddr).connect(wallet);
    await mineBlock(ga.arweave);
  });

  afterAll(async () => {
    await ga.arlocal.stop();
  });

  it('should read state and contributors', async () => {
    const initialState = await contract.readState();
    const state:any = initialState.state;
    expect(state.contributors[0].address).toEqual(editorAddress);
    expect(state.contributors[0].role).toEqual("editor");
  });

  it('should add a contributor', async () => {
    let state:any = await writeInteraction(ga, contributor, { function: 'addContributor'});
    expect(state.contributors.length).toEqual(2);
    expect(state.contributors[1].address).toEqual(contributorAddress);
    expect(state.contributors[1].role).toEqual("user");

    state = await writeInteraction(ga, wallet,
      { function: 'setRole', userAddr: contributorAddress, role: 'contributor' }
    );
    expect(state.contributors[1].role).toEqual("contributor");
  });

  it('should add a user', async () => {
    let state:any = await writeInteraction(ga, user, { function: 'addContributor'});
    expect(state.contributors.length).toEqual(3);
    expect(state.contributorId).toEqual(2);
    expect(state.contributors[2].address).toEqual(userAddress);
    expect(state.contributors[2].role).toEqual("user");
  });

  it('should add a new version', async () => {
    const field: Field = {
      name: 'field#1',
      description: 'Description for field1',
      type: 'text',
    }

    let state:any = await writeInteraction(ga, user,
      { function: 'addField', fieldName: 'proposal #1', comment: 'comment#1', field }
    );
    expect(state.proposals.length).toEqual(1);
    expect(state.proposalId).toEqual(1);
    expect(state.proposals[0].name).toEqual('proposal #1');
    expect(state.proposals[0].status).toEqual('add');
    expect(state.proposals[0].field.name).toEqual('field#1');
    expect(state.proposals[0].field.description).toEqual('Description for field1');
    expect(state.proposals[0].field.type).toEqual('text');
    expect(state.proposals[0].proposer).toEqual(userAddress);
    expect(state.proposals[0].comments[0].by).toEqual(userAddress);
    expect(state.proposals[0].comments[0].text).toEqual('comment#1');
  });

  it('should add a comment', async () => {
    const state:any = await writeInteraction(ga, contributor,
      { function: 'addComment', proposalId: 0, text: 'comment#2' }
    );
    console.log(state.proposals[0].comments)
    expect(state.proposals[0].comments[1].text).toEqual('comment#2');
    expect(state.proposals[0].comments[1].by).toEqual(contributorAddress);
 
  });
 
/*
  it('should open and close the version - Approved', async () => {
    let state:any = await writeInteraction(ga, wallet,
      { function: 'setStatus', versionId: 0, status: 'open', update: '' }
    );
    expect(state.proposals[0].status).toEqual('open');
    state = await writeInteraction(ga, wallet, 
      { function: 'setStatus', versionId: 0, status: 'approved', update: 'major' }
    );
    expect(state.proposals[0].status).toEqual('approved');
    expect(state.proposals[0].version).toEqual('1.0.0');
    expect(state.major).toEqual(1);
    expect(state.minor).toEqual(0);
    expect(state.patch).toEqual(0);
    expect(state.openVersion).toEqual(-1);
    expect(state.currentVersion).toEqual(0);
  });

  it('should add proposal and Abandon it', async () => {
    let state:any = await writeInteraction(ga, user,
      { function: 'addVersion', name: 'proposal #2', comment: 'test new comment' }
    );
    state = await writeInteraction(ga, wallet,
      { function: 'setStatus', versionId: 1, status: 'abandoned', update: '' }
    );
    expect(state.proposals[1].status).toEqual('abandoned');
    expect(state.openVersion).toEqual(-1);
    expect(state.currentVersion).toEqual(0);
  });

  it('should open proposal and abandon it', async () => {
    let state:any = await writeInteraction(ga, user,
      { function: 'addVersion', name: 'proposal #3', comment: 'test new comment' }
    );
    state = await writeInteraction(ga, wallet,
      { function: 'setStatus', versionId: 2, status: 'open', update: '' }
    );
    state = await writeInteraction(ga, wallet,
      { function: 'setStatus', versionId: 2, status: 'abandoned', update: '' }
    );
    expect(state.proposals[2].status).toEqual('abandoned');
    expect(state.openVersion).toEqual(-1);
    expect(state.currentVersion).toEqual(0);
  });

  it('should add fields to a proposal', async () => {
    let state:any = await writeInteraction(ga, user,
      { function: 'addVersion', name: 'proposal #4', comment: 'test new comment' }
    );
    state = await writeInteraction(ga, wallet,
      { function: 'setStatus', versionId: 3, status: 'open', update: '' }
    );
    expect(state.proposals[3].status).toEqual('open');
    expect(state.openVersion).toEqual(3);
    state = await writeInteraction(ga, wallet,
      { function: 'addField', versionId: 3, status: 'open', update: '' }
    );
  });
*/
});
