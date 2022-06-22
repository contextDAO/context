import * as states from "../src/tools/schemas";
import { mineBlock } from "../src/index";
import {UniteState} from "../src/contracts/Unite/types/types";

describe("Testing the Unite DAO Unite", () => {

  it("Should testglobal.wallets", async () => {
    const balance1 = await global.unite.getBalance(global.wallet);
    expect(balance1).toBeLessThan(1000);
    expect(balance1).toBeGreaterThan(900);
    const state: UniteState = await global.unite.get();
    expect(state.ticker).toEqual("UDAO");
    expect(state.name).toEqual("Unite DAO Credits");
    expect(state.owner).toEqual(global.walletAddress);
 });

  it("Should Mint Tokens", async () => {
    await global.unite.mint(global.wallet, 100000);
    await mineBlock(global.unite.arweave);
    const state: UniteState = await global.unite.get();
    expect(state.balances[global.walletAddress]).toEqual(100000);
  });

  it("Should register Schema", async () => {
    const schema = await global.unite.deploySchema(
      global.wallet,
      "Human",
      states.humanState,
    );
    await mineBlock(global.unite.arweave);
    await global.unite.registerSchema(global.wallet, `Human`, schema.contractAddr);
    await mineBlock(global.unite.arweave);
    const state: UniteState = await global.unite.get();
    expect(state.schemas[0].id).toEqual(`Human`);
    expect(state.schemas[0].address).toEqual(schema.contractAddr);
  });

  it("Should register a name", async () => {
    const metadata = await global.unite.write(
      global.wallet,
      "collector",
      "Human",
      0,
    );
    await mineBlock(global.unite.arweave);
    const state: UniteState = await global.unite.get();
    console.log(state);
  });

  xit("Should get the data for that name", async () => {
    // let data = await global.unite.get("collector");
    // data = await global.unite.get("collector");
  });

  xit("Should add a name level 2", async () => {
    /*
    const metadata = await global.unite.deployMetadata(
      global.wallet,
      "NFT",
      "Human",
      0,
    );
 
    let data = await global.unite.get("collector/nfts");
    */
  });
});
