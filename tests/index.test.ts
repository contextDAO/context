// Context.
import * as context from './context';
describe(`1 - Context`, () => {
  it(`1.1 - Deploy Context`, async () => { await context.testDeploy(); });
  it(`1.2 - Evolve Context`, async () => { await context.testEvolve(); });
});

// Schemas.
import * as schema from './schemas';
describe(`2 - Schemas`, () => {
  it(`2.1 - Register Schemas`, async () => { await schema.testCreateSchema(); });
  it(`2.2 - Get Schema`, async () => { await schema.testGetSchema(); });
  it(`2.3 - Add contributors`, async () => { await schema.testAddContributor(); });
  it(`2.4 - Edit contributors`, async () => { await schema.testEditContributor(); });
  it(`2.5 - Add proposals`, async () => { await schema.testAddProposal(); });
  it(`2.6 - Approve one proposal`, async () => { await schema.testApproveProposal(); });
  it(`2.7 - Abandon one proposal`, async () => { await schema.testAbandonProposal(); });
  xit(`2.8 - Register SubSchemas`, async () => {});
});

import * as data from './datapod';
describe(`3 - DataPod`, () => {
  it(`3.1 - Write Data`, async () => { await data.testWriteDataPod(); });
  it(`3.2 - Get Data`, async () => { await data.testGetDataPod(); });
  it(`3.3 - Update Data`, async () => { await data.testUpdateDataPod(); });
  xit(`3.4 - Add items to Collections`, async () => { });
  xit(`3.5 - Edit items from Collections`, async () => {});
  xit(`3.6 - Register subnames`, async () => {});
});

import * as token from './token';
describe(`4 - Token`, () => {
  it(`4.1 - Mint new Tokens`, async () => { await token.testMintTokens(); });
  it(`4.2 - Get Balance`, async () => { await token.testGetBalance(); });
  xit(`4.3 - Set token Price`, async () => {});
  xit(`4.4 - Register a new name - pay price`, async () => {});
});
