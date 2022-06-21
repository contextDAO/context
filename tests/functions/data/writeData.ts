import { mineBlock, MetadataState } from "../../../src/index";

/**
 * createSchema
 */
export default async function writeData() {
  await global.unite.write(
      global.wallet,
      `myNFT`,
      `NFT`,
      {
        name: `My first NFT`,
        image: `ar://1234`,
      }
    );
    await mineBlock(global.unite.arweave);

    const metadata = await global.unite.read(`myNFT`);
  console.log(metadata);
  /*
    const state: MetadataState = await metadata.readState();
    expect(state.owner).toEqual(global.walletAddress);
    expect(state.id).toEqual(`myNFT`);
    expect(state.schema).toEqual(`NFT`);
    expect(state.release).toEqual(0);
    expect(state.metadata).toEqual({});
*/
}
