import { mineBlock, connectWallet, editContributor, getSchemaState } from "../../src/index";
import { SchemaState } from "../../src/contracts/Schema/types/types";

/**
 * testEditContributor
 */
export default async function testEditContributor() {
  // Register new contributor.
  await connectWallet(global.unite, global.editor.json);
  await editContributor(global.unite, `NFT`, global.contributor.address, `contributor`);

  // get the contributors.
  await mineBlock(global.unite.arweave);
  const nft: SchemaState = await getSchemaState(global.unite, `NFT`);
  expect(nft.contributors[1].address).toEqual(global.contributor.address);
  expect(nft.contributors[1].role).toEqual(`contributor`);
}

