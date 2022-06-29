import { mineBlock, createSchema } from "../../src/index";
import { humanState } from "../../src/utils/schemas/human";

/**
 * testCreateSchema
 */
export default async function testCreateSchema() {
  // Create empty schemas.
  await createSchema(global.context, `Human`, humanState );
  await createSchema(global.context, `NFT` );

  // get the schema and check values.
  await mineBlock(global.context.arweave);
}

