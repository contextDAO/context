import { mineBlock, writeData } from "../../src/index";

/**
 * createSchema
 */
export default async function writeData() {
  await writeData(
      global.unite,
      `NFT`,
      `myNFT`,
      {
        name: `My first NFT`,
        image: `ar://1234`,
      }
    );
    await mineBlock(global.unite.arweave);

    const metadata = await global.unite.read(`myNFT`);
    expect(metadata.owner).toEqual(global.walletAddress);
    expect(metadata.id).toEqual(`myNFT`);
    expect(metadata.schema).toEqual(`NFT`);
    expect(metadata.name).toEqual(`My first NFT`);
    expect(metadata.release).toEqual(0);
}
