import ArLocal from 'arlocal';
import { Unite, Standard, testWallet, mineBlock } from '../src/index';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { UniteSchemaState, StandardFrom } from '../src/contracts/types/standardTypes';

describe('Testing the Unite DAO Contract', () => {
  let arlocal: ArLocal;
  let unite: Unite;
  let wallet: JWKInterface;
  let walletAddress : string;
  let contributor: JWKInterface;
  let contributorAddress : string;
  let user: JWKInterface;
  let userAddress: string;
  let standard: Standard;


  beforeAll(async () => {
    arlocal = new ArLocal(1984, false);
    await arlocal.start();
    unite = await Unite.init('localhost');
 });

  afterAll(async () => { 
    arlocal.stop()
  });

  it('Should create wallets', async () => {
    wallet = await testWallet(unite.arweave);
    const balance1 = await unite.getBalance(wallet);
    expect(balance1).toEqual(1000);
    walletAddress = await unite.getAddress(wallet);
    const balance2 = await unite.getBalance(walletAddress);
    expect(balance2).toEqual(1000);

    contributor = await testWallet(unite.arweave);
    contributorAddress = await unite.getAddress(contributor);

    user = await testWallet(unite.arweave);
    userAddress = await unite.getAddress(user);
  })

  it('Should deploy a Standard', async () => {
    standard = await unite.deployStandard(wallet, 'Base NFT', 'Basic NFT Metadata')
    await standard.connect(wallet);
    await mineBlock(unite.arweave);
    const state: UniteSchemaState = await standard.readState();
    expect(state.contributors[0].address).toEqual(walletAddress);
    expect(state.contributors[0].role).toEqual("editor");
  });

  it('Should get the standard', async () => {
    const st = await unite.getStandard(standard.contractAddr);
    let state1: UniteSchemaState = await standard.readState();
    let state2: UniteSchemaState = await st.readState();
    expect(state1).toEqual(state2);
  });

  it('should add a contributor', async () => {
    await standard.register(contributor);
    await mineBlock(unite.arweave);
    let state: UniteSchemaState = await standard.readState();
    expect(state.contributors.length).toEqual(2);
    expect(state.contributors[1].address).toEqual(contributorAddress);
    expect(state.contributors[1].role).toEqual("user");

    await standard.connect(wallet);
    await standard.setRole('contributor', contributorAddress);
    await mineBlock(unite.arweave);
    state = await standard.readState();
    expect(state.contributors[1].role).toEqual("contributor");
  });

  it('should add a user', async () => {
    await standard.register(user);
    await mineBlock(unite.arweave);
    const state: UniteSchemaState = await standard.readState();
    expect(state.contributors.length).toEqual(3);
    expect(state.contributorId).toEqual(2);
    expect(state.contributors[2].address).toEqual(userAddress);
    expect(state.contributors[2].role).toEqual("user");
  });

  it('should add a new proposal', async () => {
    await standard.addProposal('prop#1', 'com#1', 'field#1', 'description', 'text');
    await mineBlock(unite.arweave);
    const state: UniteSchemaState = await standard.readState();
    expect(state.proposals.length).toEqual(1);
    expect(state.proposalId).toEqual(-1);
    expect(state.proposals[0].name).toEqual('prop#1');
    expect(state.proposals[0].status).toEqual('proposal');
    expect(state.proposals[0].field?.name).toEqual('field#1');
    expect(state.proposals[0].field?.description).toEqual('description');
    expect(state.proposals[0].field?.type).toEqual('text');
    expect(state.proposals[0].proposer).toEqual(userAddress);
    expect(state.proposals[0].comments[0].by).toEqual(userAddress);
    expect(state.proposals[0].comments[0].text).toEqual('com#1');
  });

  it('should add a comment', async () => {
    await standard.connect(contributor);
    await standard.addComment(0, 'com#2');
    await mineBlock(unite.arweave);
    const state: UniteSchemaState = await standard.readState();
    expect(state.proposals[0].comments[1].text).toEqual('com#2');
    expect(state.proposals[0].comments[1].by).toEqual(contributorAddress);
  });
 
  it('should open the proposal', async () => {
    await standard.connect(wallet);
    await standard.updateProposal(0, 'open');
    await mineBlock(unite.arweave);
    const state: UniteSchemaState = await standard.readState();
    expect(state.proposals[0].status).toEqual('open');
    expect(state.proposalId).toEqual(0);
  });

  it('should approve the proposal', async () => {
    await standard.updateProposal(0, 'approved', 'major');
    await mineBlock(unite.arweave);
    const state: UniteSchemaState = await standard.readState();
    expect(state.proposals[0].status).toEqual('approved');
    expect(state.versions[0].version).toEqual('1.0.0');
    expect(state.major).toEqual(1);
    expect(state.minor).toEqual(0);
    expect(state.patch).toEqual(0);
    expect(state.versions[0].fields[0]?.name).toEqual('field#1');
    expect(state.versions[0].fields[0]?.description).toEqual('description');
    expect(state.versions[0].fields[0]?.type).toEqual('text');
    expect(state.proposalId).toEqual(-1);
    expect(state.versionId).toEqual(0);
  });

  it('should add one proposal and Abandon it', async () => {
    await standard.addProposal('prop#2', 'com#1', 'field#2', 'description', 'text');
    await mineBlock(unite.arweave);
    await standard.updateProposal(1, 'abandoned');
    await mineBlock(unite.arweave);
    const state: UniteSchemaState = await standard.readState();
    expect(state.proposals[1].status).toEqual('abandoned');
  });

  it('should edit an existing and approve the proposal', async () => {
    await standard.addProposal('prop#3', 'com#1', 'field#1', 'New description', 'number');
    await mineBlock(unite.arweave);
    await standard.updateProposal(2, 'open');
    await mineBlock(unite.arweave);
    await standard.updateProposal(2, 'approved', 'patch');
    await mineBlock(unite.arweave);
    const state: UniteSchemaState = await standard.readState();
    expect(state.proposals[2].status).toEqual('approved');
    expect(state.major).toEqual(1);
    expect(state.minor).toEqual(0);
    expect(state.patch).toEqual(1);
    expect(state.versions[1].fields[0]?.name).toEqual('field#1');
    expect(state.versions[1].fields[0]?.description).toEqual('New description');
    expect(state.versions[1].fields[0]?.type).toEqual('number');
    expect(state.proposalId).toEqual(-1);
    expect(state.versionId).toEqual(1);
  });

  it('should get the last proposal', async () => {
    const schema = await standard.getSchema();
    expect(schema['$schema']).toEqual('https://json-schema.org/draft/2020-12/schema');
    expect(schema.title).toEqual('Base NFT');
    expect(schema.type).toEqual('object');
    expect(schema.properties['field#1']).toEqual({description: 'New description', type: 'number'});
  });

  it('should add a contract with inheritance', async () => {
    const state: UniteSchemaState = await standard.readState();
    const standardFrom : StandardFrom = {
      standardId: standard.contractAddr,
      version: state.versionId 
    }
    const avatar = await unite.deployStandard(wallet, 'avatar', 'NFT Avatars', standardFrom);
    await avatar.connect(wallet);
    await mineBlock(unite.arweave);
    let avatarState : UniteSchemaState = await avatar.readState();
    expect(avatarState.from.standardId).toEqual(standard.contractAddr);
    expect(avatarState.from.version).toEqual(1);
    await avatar.addProposal('prop#1', 'com#1', 'level', 'Level', 'number');
    await mineBlock(unite.arweave);
    await avatar.updateProposal(0, 'open');
    await mineBlock(unite.arweave);
    await avatar.updateProposal(0, 'approved', 'major');
    await mineBlock(unite.arweave);
 
    avatarState = await avatar.readState();
    const schema = await avatar.getSchema();
    expect(schema.title).toEqual('avatar');
    expect(schema.description).toEqual('NFT Avatars');
    expect(schema.properties['field#1']).toEqual({description: 'New description', type: 'number'});
    expect(schema.properties['level']).toEqual({description: 'Level', type: 'number'});
  });
});
