import { mineBlock, createSchema } from "../../src/index";

/**
 * testCreateSchema
 */
export default async function testCreateSchema() {
  // Create empty schemas.
  await createSchema(global.unite, `Human` );
  await createSchema(global.unite, `NFT` );

  // get the schema and check values.
  await mineBlock(global.unite.arweave);

}

