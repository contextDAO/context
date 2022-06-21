import * as test from "./functions";

describe(`1 - Schemas`, () => {

  it(`1.1 - Register SubSchemas`, async () => { await test.createSchema(); });
  it(`1.2 - Add a contributor`, async () => { await test.addContributors(); });
  it(`1.3 - Approve a new proposal`, async () => { await test.approveProposal(); });
  it(`1.4 - Abandon a proposal`, async () => { await test.abandonProposal(); });
  xit(`1.5 - Register SubSchemas`, async () => { await test.createSubSchema(); });
});

describe(`2 - Data`, () => {
  it(`2.1 - Write Data`, async () => { await test.writeData(); });
  it(`2.2 - Read Data`, async () => { await test.readData(); });
  xit(`2.1 - Update Data`, async () => {});
  xit(`2.3 - Add items to Collections`, async () => { });
  xit(`2.4 - Edit items from Collections`, async () => {});
  xit(`2.5 - Register subnames`, async () => {});
});

describe(`3 - Economy`, () => {
  xit(`3.1 - Mint new Tokens`, async () => {});
});
