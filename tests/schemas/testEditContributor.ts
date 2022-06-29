import { mineBlock, connectWallet, editContributor, getSchemaState } from "../../src/index";
import { SchemaState } from "../../src/contracts/Schema/types/types";

/**
 * testEditContributor
 */
export default async function testEditContributor() {
  // Register new contributor.
  await connectWallet(global.context, global.editor.json);
  await editContributor(global.context, `NFT`, global.contributor.address, `contributor`);

  // get the contributors.
  await mineBlock(global.context.arweave);
  const nft: SchemaState = await getSchemaState(global.context, `NFT`);
  expect(nft.contributors[1].address).toEqual(global.contributor.address);
  expect(nft.contributors[1].role).toEqual(`contributor`);
}

