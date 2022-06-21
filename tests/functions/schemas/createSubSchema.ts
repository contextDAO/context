import { mineBlock, schemaState } from "../../../src/index";
import { SchemaState } from "../../../src/contracts/Schema/types/types";

/**
 * createSchema
 */
export default async function createSubSchema() {
  // Create an empty schema.
  await global.unite.createSchema(global.wallet, `NFT/Avatar`, schemaState);

  // get the schema and check values.
  await mineBlock(global.unite.arweave);
  const nft: SchemaState = await global.unite.getSchema(`NFT`);
  expect(nft.id).toEqual(`Avatar`);
  expect(nft.contributors[0].address).toEqual(global.walletAddress);
  expect(nft.contributors[0].role).toEqual(`editor`);
}
