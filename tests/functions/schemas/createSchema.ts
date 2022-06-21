import { mineBlock, schemaState } from "../../../src/index";
import { SchemaState } from "../../../src/contracts/Schema/types/types";

/**
 * createSchema
 */
export default async function createSchema() {
  // Create an empty schema.
  await global.unite.createSchema(global.wallet, `NFT`, schemaState);

  // get the schema and check values.
  await mineBlock(global.unite.arweave);
  const nft: SchemaState = await global.unite.getSchema(`NFT`);

  // Test results
  expect(nft.id).toEqual(`NFT`);
  expect(nft.contributors[0].address).toEqual(global.walletAddress);
  expect(nft.contributors[0].role).toEqual(`editor`);
}

