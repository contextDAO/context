import { mineBlock } from "../../../src/index";
import { SchemaState, Field } from "../../../src/contracts/Schema/types/types";

/**
 * abandonProposal
 */
export default async function abandonProposal() {
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

