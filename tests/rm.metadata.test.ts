import { mineBlock } from "../src/index";
import { MetadataState } from "../src/contracts/Metadata/types/types";
import Metadata from "../src/lib/metadata";
import * as states from "../src/tools/schemas";

describe("Testing the Unite DAO Contract", () => {
  let metadata: Metadata;

  it("Prepare a Standard", async () => {
    const schema = await global.unite.deploySchema(
      global.wallet,
      "Collection",
      states.collectionState,
    );
    await mineBlock(global.unite.arweave);
    await global.unite.registerSchema(global.wallet, `Collection`, schema.contractAddr);
    await mineBlock(global.unite.arweave);
  });

  it("Should deploy a metadata", async () => {
    metadata = await global.unite.write(
      global.wallet,
      "nftcollection",
      "Collection",
      {
        name: 'Collection on NFTS',
        network: 'Starknet',
        address: '0x1111',
        tokens: []
      }
    );
    await mineBlock(global.unite.arweave);
    const state: MetadataState = await metadata.readState();
    expect(state.owner).toEqual(global.walletAddress);
    expect(state.id).toEqual("nftcollection");
    expect(state.schema).toEqual("Collection");
    expect(state.release).toEqual(0);
    expect(state.metadata).toEqual({});
  });

  it("Should should update metadata", async () => {
    await metadata.connect(global.wallet);
    await metadata.set("url", "https://unitedao.xyz");
    await mineBlock(global.unite.arweave);
    const state: MetadataState = await metadata.readState();
    expect(state.metadata.url).toEqual("https://unitedao.xyz");
    const url = await metadata.get("url");
    expect(state.metadata.url).toEqual(url);
  });

  it("Should add a new Item", async () => {
    const nft = { a: 1, b: 2};
    await metadata.addItem("tokens", nft, 1);
    await mineBlock(global.unite.arweave);
    const state: MetadataState = await metadata.readState();
    const retValue  = await metadata.get("tokens", 1);
    expect(nft.a).toEqual(retValue.a);
    expect(nft.b).toEqual(retValue.b);
    expect(1).toEqual(retValue.id);
  });
});
