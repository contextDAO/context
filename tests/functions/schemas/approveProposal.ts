import { mineBlock } from "../../../src/index";
import { SchemaState, Field } from "../../../src/contracts/Schema/types/types";

/**
 * approveProposal
 */
export default async function approveProposal() {
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
