import { createSchema, addContributors, approveProposal, abandonProposal } from "./1.schemas";
import { writeData } from "./2.data";

describe(`1 - Schemas`, () => {

  it(`1.1 - Register Schemas`, async () => { await createSchema(); });
  it(`1.2 - Add a contributor`, async () => { await addContributors(); });
  it(`1.3 - Approve a new proposal`, async () => { await approveProposal(); });
  it(`1.4 - Abandon a proposal`, async () => { await abandonProposal(); });
});

describe(`2 - Data`, () => {
  xit(`2.1 - Write Data`, async () => {});
  xit(`2.1 - Update Data`, async () => {});
  xit(`2.3 - Add items to Collections`, async () => { });
  xit(`2.4 - Edit items from Collections`, async () => {});
});

describe(`3 - Names`, () => {
  xit(`3.1 - Register subnames`, async () => {});

});
describe(`4 - PST`, () => {
  xit(`4.1 - Mint new Tokens`, async () => {});
});
