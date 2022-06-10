describe("Testing the Unite DAO Registry", () => {

  it("Should testglobal.wallets", async () => {
    const balance1 = await global.unite.getBalance(global.wallet);
    expect(balance1).toEqual(1000);
 });
});
