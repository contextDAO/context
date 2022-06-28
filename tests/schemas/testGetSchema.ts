import { getSchemaState, defaultState } from "../../src/index";

/**
 * testGetSchema
 */
export default async function testGetSchema() {
  // Create an empty schema.
  const nft: typeof defaultState.schema = await getSchemaState(global.unite, `NFT` );

  // Test results
  expect(nft.schemaId).toEqual(`NFT`);
  expect(nft.contributors[0].address).toEqual(global.editor.address);
  expect(nft.contributors[0].role).toEqual(`editor`);
  const human: typeof defaultState.schema = await getSchemaState(global.unite, `Human` );

  // Check Human is deployed and version 1 is released
  expect(human.releaseId).toEqual(0);

}

