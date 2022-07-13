import { mineBlock, deploySchema, registerSchema } from "../../src/index";
import { humanState } from "../../src/utils/schemas/human";

/**
 * testCreateSchema
 */
export default async function testCreateSchema() {
  // Create empty schemas.
  const humanAddr = await deploySchema(global.context, humanState );
  await mineBlock(global.context.arweave);
  await registerSchema(global.context, `Human`, humanAddr);
  await mineBlock(global.context.arweave);

  const nftAddr = await deploySchema(global.context);
  await mineBlock(global.context.arweave);
  await registerSchema(global.context, `NFT`, nftAddr );
  await mineBlock(global.context.arweave);

  // get the schema and check values.
  await mineBlock(global.context.arweave);
}

