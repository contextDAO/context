import { mineBlock, connectWallet, getSchemaState, editProposal } from "../../src/index";
import { SchemaState, Field } from "../../src/contracts/Schema/types/types";

/**
 * approveProposal
 */
export default async function approveProposal() {
  await connectWallet(global.unite, global.contributor.json);
  await editProposal(global.unite, `NFT`, 0, `approved`);
  await mineBlock(global.unite.arweave);

  const nft: SchemaState = await getSchemaState(global.unite, `NFT`);
  expect(nft.proposals[0].status).toEqual(`approved`);
  expect(nft.releases[0].fields[0]?.name).toEqual(`level`);
  expect(nft.releaseId).toEqual(0);
}
