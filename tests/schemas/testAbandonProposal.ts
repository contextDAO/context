import { mineBlock, connectWallet, getSchemaState, editProposal } from "../../src/index";
import { SchemaState } from "../../src/contracts/Schema/types/types";

/**
 * testAbandonProposal
 */
export default async function testAbandonProposal() {
  await connectWallet(global.unite, global.contributor.json);
  await editProposal(global.unite, `NFT`, 1, `abandoned`);
  await mineBlock(global.unite.arweave);

  const nft: SchemaState = await getSchemaState(global.unite, `NFT`);
  expect(nft.proposals[1].status).toEqual(`abandoned`);
  expect(nft.releaseId).toEqual(0);
}
