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
  it(`2.3 - Add contributors`, async () => { await schema.testAddContributor(); });
  it(`2.4 - Edit contributors`, async () => { await schema.testEditContributor(); });
  it(`2.5 - Add proposals`, async () => { await schema.testAddProposal(); });
  it(`2.6 - Approve one proposal`, async () => { await schema.testApproveProposal(); });
  it(`2.7 - Abandon one proposal`, async () => { await schema.testAbandonProposal(); });
  xit(`2.8 - Register Collection Schema`, async () => {});
  xit(`2.9 - Register SubSchemas`, async () => {});
});

describe(`3 - Data`, () => {
  xit(`3.1 - Write Data`, async () => {});
  xit(`3.2 - Read Data`, async () => {});
  xit(`3.3 - Update Data`, async () => {});
  xit(`3.4 - Add items to Collections`, async () => { });
  xit(`3.5 - Edit items from Collections`, async () => {});
  xit(`3.6 - Register subnames`, async () => {});
});

describe(`4 - Economy`, () => {
  xit(`4.1 - Mint new Tokens`, async () => {});
});
