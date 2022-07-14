import { mineBlock, connectWallet, getSchemaState, editProposal } from "../../src/index";
import { SchemaState } from "../../src/contracts/Schema/types/types";

/**
 * approveProposal
 */
export default async function approveProposal() {
  await connectWallet(global.context, global.contributor.json);
  await editProposal(global.context, `NFT`, 0, `approved`);
  await mineBlock(global.context.arweave);

  const nft: SchemaState = await getSchemaState(global.context, `NFT`);
  expect(nft.proposals[0].status).toEqual(`approved`);
  expect(nft.releases[0].fields[5]?.name).toEqual(`level`);
  expect(nft.releaseId).toEqual(1);
}
