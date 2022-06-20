import { mineBlock, schemaState } from "../src/index";
import { SchemaState, Field } from "../src/contracts/Schema/types/types";

/**
 * createSchema
 */
export async function createSchema() {
  // Create an empty schema.
  await global.unite.createSchema(global.wallet, `NFT`, schemaState);

  // get the schema and check values.
  await mineBlock(global.unite.arweave);
  const nft: SchemaState = await global.unite.getSchema(`NFT`);
  expect(nft.id).toEqual(`NFT`);
  expect(nft.contributors[0].address).toEqual(global.walletAddress);
  expect(nft.contributors[0].role).toEqual(`editor`);
}

/**
 * addContributors
 */
export async function addContributors() {
  // Register new contributor.
  await global.unite.addContributor(global.contributor, `NFT`);

  // get the contributors.
  await mineBlock(global.unite.arweave);
  let nft: SchemaState = await global.unite.getSchema(`NFT`);
  expect(nft.contributors[1].address).toEqual(global.contributorAddress);
  expect(nft.contributors[1].role).toEqual(`user`);

  // Register new contributor.
  await global.unite.editContributor(global.wallet, `NFT`, global.contributorAddress, `contributor`);
  await mineBlock(global.unite.arweave);
  nft = await global.unite.getSchema(`NFT`);
  expect(nft.contributors[1].address).toEqual(global.contributorAddress);
  expect(nft.contributors[1].role).toEqual(`contributor`);
}

/**
 * approveProposal
 */
export async function approveProposal() {
  // Create a new proposal
  await global.unite.addProposal(
    global.contributor,
    `NFT`,
    `Add Level Field`,
    {
      name: `level`,
      description: `Level of the NFT`,
      type: `Number`,
      required: false,
    } as Field
  );
  await mineBlock(global.unite.arweave);
  let nft: SchemaState = await global.unite.getSchema(`NFT`);
  expect(nft.proposals.length).toEqual(1);
  expect(nft.proposals[0].name).toEqual(`Add Level Field`);
  expect(nft.proposals[0].status).toEqual(`proposal`);
  expect(nft.proposals[0].field?.name).toEqual(`level`);
  expect(nft.proposals[0].field?.description).toEqual(`Level of the NFT`);
  expect(nft.proposals[0].field?.type).toEqual(`Number`);
  expect(nft.proposals[0].field?.required).toEqual(false);
  expect(nft.proposals[0].proposer).toEqual(global.contributorAddress);

  // Update Proposal status
  await global.unite.editProposal(
    global.contributor,
    `NFT`,
    0,
    `approved`
  );
  await mineBlock(global.unite.arweave);
  nft = await global.unite.getSchema(`NFT`);
  expect(nft.proposals[0].status).toEqual(`approved`);
  expect(nft.releases[0].fields[0]?.name).toEqual(`level`);
  expect(nft.releaseId).toEqual(0);
}

/**
 * abandonProposal
 */
export async function abandonProposal() {
  // Create a new proposal
  await global.unite.addProposal(
    global.contributor,
    `NFT`,
    `Add Level Field (duplicated)`,
    {
      name: `level2`,
      description: `Level of the NFT`,
      type: `Number`,
      required: false,
    } as Field
  );
  await mineBlock(global.unite.arweave);
  let nft: SchemaState = await global.unite.getSchema(`NFT`);
  expect(nft.proposals.length).toEqual(2);
  expect(nft.proposals[1].field?.name).toEqual(`level2`);

  // Update Proposal status
  await global.unite.editProposal(
    global.contributor,
    `NFT`,
    1,
    `abandoned`
  );
  await mineBlock(global.unite.arweave);
  nft = await global.unite.getSchema(`NFT`);
  expect(nft.proposals[1].status).toEqual(`abandoned`);
  expect(nft.releaseId).toEqual(0);
}

