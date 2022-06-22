// Context.
import * as context from "./context";
describe(`1 - Context`, () => {
  it(`1.1 - Deploy Unite`, async () => { await context.testDeploy(); });
});

// Schemas.
import * as schema from "./schemas";
describe(`2 - Schemas`, () => {
  it(`2.1 - Register Schemas`, async () => { await schema.testCreateSchema(); });
  it(`2.2 - Get Schema`, async () => { await schema.testGetSchema(); });
  xit(`2.2 - Add a contributor`, async () => { await schema.testAddContributor(); });
  // xit(`2.3 - Approve a new proposal`, async () => { await test.approveProposal(); });
  // xit(`2.4 - Abandon a proposal`, async () => { await test.abandonProposal(); });
  // xit(`2.5 - Register SubSchemas`, async () => { await test.createSubSchema(); });
});

describe(`3 - Data`, () => {
  // xit(`3.1 - Write Data`, async () => { await test.writeData(); });
  // it(`3.2 - Read Data`, async () => { await test.readData(); });
  xit(`3.1 - Update Data`, async () => {});
  xit(`3.3 - Add items to Collections`, async () => { });
  xit(`3.4 - Edit items from Collections`, async () => {});
  xit(`3.5 - Register subnames`, async () => {});
});

describe(`4 - Economy`, () => {
  xit(`4.1 - Mint new Tokens`, async () => {});
});
