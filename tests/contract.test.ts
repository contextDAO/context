import { init, addFunds, mineBlock, GlobalAr } from '../utils/arweave';
import { writeInteraction, readInteraction, readState, initialState } from '../utils/smartweave';
import { Field, UniteSchemaState } from '../src/contracts/types/types';
import { Contract } from 'redstone-smartweave';

describe('Testing the Unite DAO Contract', () => {
  let ga: GlobalAr = {} as GlobalAr;
  let contract: Contract;

  beforeAll(async () => {
    // Init local arweave and wallets.
    ga = await init();

    // Deploy contract.
    const state1 = initialState;
    state1.contributors[0].address = ga.editorAddress;
    ga.contractAddr = await ga.smartweave.createContract.deploy({
      wallet: ga.wallet,
      initState: JSON.stringify(state1),
      src: ga.contractSrc,
    });
    
    await mineBlock(ga.arweave);
  });

  afterAll(async () => { await ga.arlocal.stop() });

  it('should read state and contributors', async () => {
    const state: UniteSchemaState = await readState(ga, ga.contractAddr, ga.wallet);
    expect(state.contributors[0].address).toEqual(ga.editorAddress);
    expect(state.contributors[0].role).toEqual("editor");
  });

  it('should add a contributor', async () => {
    let state:any = await writeInteraction(ga, ga.contractAddr, ga.contributor, { function: 'addContributor'});
    expect(state.contributors.length).toEqual(2);
    expect(state.contributors[1].address).toEqual(ga.contributorAddress);
    expect(state.contributors[1].role).toEqual("user");

    state = await writeInteraction(ga, ga.contractAddr, ga.wallet,
      { function: 'setRole', userAddr: ga.contributorAddress, role: 'contributor' }
    );
    expect(state.contributors[1].role).toEqual("contributor");
  });

  it('should add a user', async () => {
    let state:any = await writeInteraction(ga, ga.contractAddr, ga.user, { function: 'addContributor'});
    expect(state.contributors.length).toEqual(3);
    expect(state.contributorId).toEqual(2);
    expect(state.contributors[2].address).toEqual(ga.userAddress);
    expect(state.contributors[2].role).toEqual("user");
  });

  it('should add a new version', async () => {
    const field: Field = {
      name: 'field#1',
      description: 'Description for field1',
      type: 'text',
    }

    let state:any = await writeInteraction(ga, ga.contractAddr, ga.user,
      { function: 'addProposal', proposalName: 'proposal #1', fieldId: -1, comment: 'comment#1', field }
    );
    expect(state.proposals.length).toEqual(1);
    expect(state.proposalId).toEqual(1);
    expect(state.proposals[0].name).toEqual('proposal #1');
    expect(state.proposals[0].status).toEqual('proposal');
    expect(state.proposals[0].fieldId).toEqual(-1);
    expect(state.proposals[0].field.name).toEqual('field#1');
    expect(state.proposals[0].field.description).toEqual('Description for field1');
    expect(state.proposals[0].field.type).toEqual('text');
    expect(state.proposals[0].proposer).toEqual(ga.userAddress);
    expect(state.proposals[0].comments[0].by).toEqual(ga.userAddress);
    expect(state.proposals[0].comments[0].text).toEqual('comment#1');
    expect(state.proposals[0].fields.length).toEqual(0);
  });

  it('should add a comment', async () => {
    const state:any = await writeInteraction(ga, ga.contractAddr, ga.contributor,
      { function: 'addComment', proposalId: 0, text: 'comment#2' }
    );
    expect(state.proposals[0].comments[1].text).toEqual('comment#2');
    expect(state.proposals[0].comments[1].by).toEqual(ga.contributorAddress);
  });
 
  it('should open and approve the new proposal', async () => {
    let state:any = await writeInteraction(ga, ga.contractAddr, ga.wallet,
      { function: 'setStatus', proposalId: 0, status: 'open', update: '' }
    );
    expect(state.proposals[0].status).toEqual('open');

    state = await writeInteraction(ga, ga.contractAddr, ga.wallet, 
      { function: 'setStatus', proposalId: 0, status: 'approved', update: 'major' }
    );
    expect(state.proposals[0].status).toEqual('approved');
    expect(state.proposals[0].version).toEqual('1.0.0');
    expect(state.major).toEqual(1);
    expect(state.minor).toEqual(0);
    expect(state.patch).toEqual(0);
    expect(state.openProposal).toEqual(-1);
    expect(state.lastProposal).toEqual(0);
    expect(state.proposals[0].fields[0].name).toEqual('field#1');
    expect(state.proposals[0].fields[0].description).toEqual('Description for field1');
    expect(state.proposals[0].fields[0].type).toEqual('text');
  });

  it('should add proposal and Abandon it', async () => {
    const field: Field = { name: 'N#2', description: 'D#2', type: 'text' }
    let state:any = await writeInteraction(ga, ga.contractAddr, ga.user,
      { function: 'addProposal', proposalName: 'proposal #2', fieldId: -1, comment: 'comment#1', field }
    );
    state = await writeInteraction(ga, ga.contractAddr, ga.wallet,
      { function: 'setStatus', proposalId: 1, status: 'abandoned', update: '' }
    );
    expect(state.proposals[1].status).toEqual('abandoned');
    expect(state.openProposal).toEqual(-1);
    expect(state.lastProposal).toEqual(0);
  });

  it('should edit and approve one proposal', async () => {
    const field: Field = { name: 'field#1.1', description: 'New description', type: 'number' }
    let state:any = await writeInteraction(ga, ga.contractAddr, ga.user,
      { function: 'addProposal', proposalName: 'proposal #3', fieldId: 0, comment: 'comment#1', field }
    );
    state = await writeInteraction(ga, ga.contractAddr, ga.wallet,
      { function: 'setStatus', proposalId: 2, status: 'open', update: '' }
    );
    expect(state.proposals[2].status).toEqual('open');

    state = await writeInteraction(ga, ga.contractAddr, ga.wallet, 
      { function: 'setStatus', proposalId: 2, status: 'approved', update: 'patch' }
    );
    expect(state.proposals[2].status).toEqual('approved');
    expect(state.proposals[2].version).toEqual('1.0.1');
    expect(state.major).toEqual(1);
    expect(state.minor).toEqual(0);
    expect(state.patch).toEqual(1);
    expect(state.openProposal).toEqual(-1);
    expect(state.lastProposal).toEqual(2);
    expect(state.proposals[2].fields[0].name).toEqual('field#1.1');
    expect(state.proposals[2].fields[0].description).toEqual('New description');
    expect(state.proposals[2].fields[0].type).toEqual('number');
  });

  it('should get the last proposal', async () => {
    const { schema } = await readInteraction(ga, ga.contractAddr, { function: 'getSchema' });
    expect(schema['$schema']).toEqual('https://json-schema.org/draft/2020-12/schema');
    expect(schema['$id']).toEqual('ar:///1.0.1');
    expect(schema.title).toEqual('Basic NFT Metadata');
    expect(schema.type).toEqual('object');
    expect(schema.properties['field#1.1']).toEqual({description: 'New description', type: 'number'});
  });

  it('should add a contract with inheritance', async () => {
    const state2 = initialState;
    state2.from.standardId = ga.contractAddr;
    state2.from.version = 2;
    state2.contributors[0].address = ga.editorAddress;
    const contractAddr2 = await ga.smartweave.createContract.deploy({
      wallet: ga.wallet,
      initState: JSON.stringify(state2),
      src: ga.contractSrc,
    });
    
    const contract2 = ga.smartweave.contract(contractAddr2).connect(ga.wallet);
    await mineBlock(ga.arweave);
    const baseState = await contract2.readState();
    let state:any = baseState.state;
    expect(state.from.standardId).toEqual(ga.contractAddr);
    expect(state.from.version).toEqual(2);

    const field: Field = {name: 'level', description: 'Level of the avatar', type: 'number'}
    await writeInteraction(ga, contractAddr2, ga.wallet,{ function: 'addProposal', proposalName: 'proposal #1', fieldId: -1, comment: 'comment#1', field });
    await writeInteraction(ga, contractAddr2, ga.wallet, { function: 'setStatus', proposalId: 0, status: 'open', update: '' });
    state = await writeInteraction(ga, contractAddr2, ga.wallet, { function: 'setStatus', proposalId: 0, status: 'approved', update: 'major' });
    console.log(state);
    const { schema } = await readInteraction(ga, contractAddr2, { function: 'getSchema' });
    console.log(schema);
  });
});
