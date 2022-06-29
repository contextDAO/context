import { mineBlock, connectWallet, getSchemaState, addProposal } from "../../src/index";
import { SchemaState, Field } from "../../src/contracts/Schema/types/types";

const field: Field = {
  name: `level`,
  description: `Level of the NFT`,
  type: `Number`,
  required: false,
};
 
/**
 * approveProposal
 */
export default async function testAddProposal() {
  await connectWallet(global.context, global.contributor.json);
  await addProposal(global.context, `NFT`, `Add Level Field`, field);
  await mineBlock(global.context.arweave);

  let nft: SchemaState = await getSchemaState(global.context, `NFT`);
  expect(nft.proposals.length).toEqual(1);
  expect(nft.proposals[0].name).toEqual(`Add Level Field`);
  expect(nft.proposals[0].status).toEqual(`proposal`);
  expect(nft.proposals[0].field?.name).toEqual(`level`);
  expect(nft.proposals[0].field?.description).toEqual(`Level of the NFT`);
  expect(nft.proposals[0].field?.type).toEqual(`Number`);
  expect(nft.proposals[0].field?.required).toEqual(false);
  expect(nft.proposals[0].proposer).toEqual(global.contributor.address);

  // Add another field.
  field.name = `level2`;
  await addProposal(global.context, `NFT`, `Add Level Field`, field);
  await mineBlock(global.context.arweave);
  nft = await getSchemaState(global.context, `NFT`);
  expect(nft.proposals.length).toEqual(2);
}
