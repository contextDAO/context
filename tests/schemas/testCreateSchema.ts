import { mineBlock, createSchema } from "../../src/index";
import { humanState } from "../../src/tools/schemas/human";

/**
 * testCreateSchema
 */
export default async function testCreateSchema() {
  // Create empty schemas.
  await createSchema(global.unite, `Human`, humanState );
  await createSchema(global.unite, `NFT` );

  // get the schema and check values.
  await mineBlock(global.unite.arweave);
}

