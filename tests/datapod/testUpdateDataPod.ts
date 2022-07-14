import { mineBlock, updateDataPod } from "../../src/index";

/**
 * createSchema
 */
export default async function testUpdateDataPod() {
  // Update the Data POD.
  await updateDataPod(global.context, `myNFT`, `name`, `test2`);
  await mineBlock(global.context.arweave);
}
