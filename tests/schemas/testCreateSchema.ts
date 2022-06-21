import { mineBlock, createSchema } from "../../src/index";

/**
 * testCreateSchema
 */
export default async function testCreateSchema() {
  // Create an empty schema.
  await createSchema(global.unite, `NFT` );

  // get the schema and check values.
  await mineBlock(global.unite.arweave);

  /*
  const nft: SchemaState = await global.unite.getSchema(`NFT`);

  // Test results
  expect(nft.id).toEqual(`NFT`);
  expect(nft.contributors[0].address).toEqual(global.editor.address);
  expect(nft.contributors[0].role).toEqual(`editor`);
  */
}

