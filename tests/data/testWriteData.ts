import { mineBlock, writeData } from "../../src/index";

const nftData = {
  name: `My first NFT`,
  image: `ar://1234`,
};

/**
 * createSchema
 */
export default async function testWriteData() {
  expect(async () => {
    await writeData(global.context, `NoSchema`, `myNFT`, nftData );
  })
  .rejects
  .toThrow(`NoSchema is not registered`);


  await writeData(global.context, `NFT`, `myNFT`, nftData );
  await mineBlock(global.context.arweave);
}
