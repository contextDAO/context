import { mineBlock, deployContext, connectWallet, evolveContext } from "../../src/index";

/**
 * testEvolve
 */
export default async function testEvolve() {
  await connectWallet(global.context, global.editor.json);
  const txId = await deployContext(global.context);
  await mineBlock(global.context.arweave);
  expect(global.context.contextAddr).toBeDefined();
  await evolveContext(global.context, txId);
  await mineBlock(global.context.arweave);
}

