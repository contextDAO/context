import { mineBlock, registerDataPod, deployDataPod } from "../../src/index";

const nftData = {
  id: 1,
  name: `My first NFT`,
  image: `ar://1234`,
};

/**
 * createSchema
 */
export default async function testWriteDataPod() {
  expect(async () => {
    await deployDataPod(global.context, `NoSchema`, nftData );
  })
  .rejects
  .toThrow(`NoSchema is not registered`);

  // Deploy the Data POD
  const podAddr = await deployDataPod(global.context, `NFT`, nftData );
  await mineBlock(global.context.arweave);

  // Register the Data POD.
  await registerDataPod(global.context, `NFT`, `myNFT`, podAddr);
  await mineBlock(global.context.arweave);
}
