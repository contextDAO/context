import { mineBlock } from "../../../src/index";
import { SchemaState } from "../../../src/contracts/Schema/types/types";

/**
 * addContributors
 */
export default async function addContributors() {
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

