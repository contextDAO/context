import { mineBlock, mintTokens, connectWallet } from "../../src/index";

/**
 * mintTokens
 */
export default async function testMintTokens() {
  connectWallet(global.context, global.user.json);
  expect(async () => {
    await mintTokens(global.context, 100);
  })
  .rejects
  .toThrow(`Only the owner can mint tokens.`);

  expect(async () => {
    await mintTokens(global.context, 0);
  })
  .rejects
  .toThrow(`Invalid token mint`);

  connectWallet(global.context, global.editor.json);
  await mintTokens(global.context, 100 );
  await mineBlock(global.context.arweave);
}
