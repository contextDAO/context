import { mineBlock, connectWallet, addContributor, getSchemaState } from "../../src/index";
import { SchemaState } from "../../src/contracts/Schema/types/types";

/**
 * testAddContributor
 */
export default async function testAddContributor() {
  // Register new contributor.
  await connectWallet(global.unite, global.contributor.json);
  await addContributor(global.unite, `NFT`);

  // get the contributors.
  await mineBlock(global.unite.arweave);
  const nft: SchemaState = await getSchemaState(global.unite, `NFT`);
  expect(nft.contributors[1].address).toEqual(global.contributor.address);
  expect(nft.contributors[1].role).toEqual(`user`);

  // Register new contributor.
// await global.unite.editContributor(global.wallet, `NFT`, global.contributorAddress, `contributor`);
// await mineBlock(global.unite.arweave);
//  nft = await global.unite.getSchema(`NFT`);
//  expect(nft.contributors[1].address).toEqual(global.contributorAddress);
//  expect(nft.contributors[1].role).toEqual(`contributor`);
}

