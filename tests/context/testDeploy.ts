import { mineBlock, deployContext, connectWallet } from "../../src/index";

/**
 * testDeploy
 */
export default async function testDeploy() {
  // Fail to Deploy Context.
  expect(async () => {
    await deployContext(global.context);
  })
  .rejects
  .toThrow(`You need to init the context and connect a wallet first`);

  await connectWallet(global.context, global.editor.json);
  await deployContext(global.context);
  await mineBlock(global.context.arweave);
  expect(global.context.contextAddr).toBeDefined();
}

