import * as states from "../src/tools/schemas";
import { mineBlock } from "../src/index";
import {RegistryState} from "../src/contracts/Registry/types/types";

describe("Testing the Unite DAO Registry", () => {

  it("Should testglobal.wallets", async () => {
    const balance1 = await global.unite.getBalance(global.wallet);
    expect(balance1).toBeLessThan(1000);
    expect(balance1).toBeGreaterThan(100);
    const state: RegistryState = await global.unite.get();
    expect(state.ticker).toEqual("UDAO");
    console.log(state);
 });

  it("Should Mint Tokens", async () => {
    await global.unite.mint(global.wallet, 100000);
    await mineBlock(global.unite.arweave);
    const state: RegistryState = await global.unite.get();
    console.log(state);
  });

  it("Should register a Schema", async () => {
    /*
    const schema = await global.unite.deploySchema(
      global.wallet,
      "Human",
      states.humanState,
    );
    await mineBlock(global.unite.arweave);

    await global.unite.registerSchema(global.wallet, `Human`, schema.contractAddr);
    await mineBlock(global.unite.arweave);
    const state: RegistryState = await global.unite.get();
    console.log(state);
    */
  });
});
