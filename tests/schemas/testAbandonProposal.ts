import { mineBlock, connectWallet, getSchemaState, editProposal } from "../../src/index";
import { SchemaState } from "../../src/contracts/Schema/types/types";

/**
 * testAbandonProposal
 */
export default async function testAbandonProposal() {
  await connectWallet(global.context, global.contributor.json);
  await editProposal(global.context, `NFT`, 1, `abandoned`);
  await mineBlock(global.context.arweave);

  const nft: SchemaState = await getSchemaState(global.context, `NFT`);
  expect(nft.proposals[1].status).toEqual(`abandoned`);
  expect(nft.releaseId).toEqual(0);
}
