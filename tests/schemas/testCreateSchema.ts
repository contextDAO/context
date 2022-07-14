import { mineBlock, deploySchema, registerSchema } from "../../src/index";
import { humanState } from "../../src/utils/schemas/human";
import { nftState } from "../../src/utils/schemas/nft";
import { collectionState } from "../../src/utils/schemas/collection";


/**
 * testCreateSchema
 */
export default async function testCreateSchema() {
  // Create Human schema.
  const humanAddr = await deploySchema(global.context, humanState );
  await mineBlock(global.context.arweave);
  await registerSchema(global.context, `Human`, humanAddr);
  await mineBlock(global.context.arweave);

  // Create empty schemas.
  const nftAddr = await deploySchema(global.context, nftState);
  await mineBlock(global.context.arweave);
  await registerSchema(global.context, `NFT`, nftAddr );
  await mineBlock(global.context.arweave);
  //
  // Create empty schemas.
  const collectionAddr = await deploySchema(global.context, collectionState);
  await mineBlock(global.context.arweave);
  await registerSchema(global.context, `Collection`, collectionAddr );
  await mineBlock(global.context.arweave);
}

