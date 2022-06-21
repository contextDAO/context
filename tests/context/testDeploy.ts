import { mineBlock, deployUnite, connectWallet } from "../../src/index";

/**
 * testDeploy
 */
export default async function testDeploy() {
  // Fail to Deploy Unite.
  expect(async () => {
    await deployUnite(global.unite);
  })
  .rejects
  .toThrow(`You need to init the context and connect a wallet first`);

  await connectWallet(global.unite, global.editor.json);
  await deployUnite(global.unite);
  await mineBlock(global.unite.arweave);
  expect(global.unite.uniteAddr).toBeDefined();
}

