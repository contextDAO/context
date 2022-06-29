import { mineBlock, connectWallet, addContributor, getSchemaState } from "../../src/index";
import { SchemaState } from "../../src/contracts/Schema/types/types";

/**
 * testAddContributor
 */
export default async function testAddContributor() {
  // Register new contributor.
  await connectWallet(global.context, global.contributor.json);
  await addContributor(global.context, `NFT`);

  // get the contributors.
  await mineBlock(global.context.arweave);
  const nft: SchemaState = await getSchemaState(global.context, `NFT`);
  expect(nft.contributors[1].address).toEqual(global.contributor.address);
  expect(nft.contributors[1].role).toEqual(`user`);

  // Register new contributor.
// await global.context.editContributor(global.wallet, `NFT`, global.contributorAddress, `contributor`);
// await mineBlock(global.context.arweave);
//  nft = await global.context.getSchema(`NFT`);
//  expect(nft.contributors[1].address).toEqual(global.contributorAddress);
//  expect(nft.contributors[1].role).toEqual(`contributor`);
}

