import { mineBlock, mintTokens, connectWallet } from "../../src/index";

/**
 * mintTokens
 */
export default async function testMintTokens() {
  await connectWallet(global.context, global.editor.json);
  await mintTokens(global.context, 100);
  await mineBlock(global.context.arweave);
}
