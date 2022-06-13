import { Schema, mineBlock } from "../src/index";
import {
  SchemaState,
  Field,
} from "../src/contracts/Schema/types/types";

describe("Testing the Unite DAO Schemas Contract", () => {
  let schema: Schema;

  it("Should testglobal.wallets", async () => {
    const balance1 = await global.unite.getBalance(global.wallet);
    expect(balance1).toEqual(1000);
 });

  it("Should deploy a Schema", async () => {
    schema = await global.unite.deploySchema(
      global.wallet,
      "Human",
    );
    await schema.connect(global.wallet);
    await mineBlock(global.unite.arweave);
    const state: SchemaState = await schema.readState();
    expect(state.contributors[0].address).toEqual(global.walletAddress);
    expect(state.contributors[0].role).toEqual("editor");
  });

  it("Should get the state", async () => {
    const st = await global.unite.getSchema(schema.contractAddr);
    const state1: SchemaState = await schema.readState();
    const state2: SchemaState = await st.readState();
    expect(state1).toEqual(state2);
  });

  it("should add a contributor", async () => {
    await schema.register(global.contributor);
    await mineBlock(global.unite.arweave);
    let state: SchemaState = await schema.readState();
    expect(state.contributors.length).toEqual(2);
    expect(state.contributors[1].address).toEqual(global.contributorAddress);
    expect(state.contributors[1].role).toEqual("user");

    await schema.connect(global.wallet);
    await schema.setRole("contributor", global.contributorAddress);
    await mineBlock(global.unite.arweave);
    state = await schema.readState();
    expect(state.contributors[1].role).toEqual("contributor");
  });

  it("should add a global.user", async () => {
    await schema.register(global.user);
    await mineBlock(global.unite.arweave);
    const state: SchemaState = await schema.readState();
    expect(state.contributors.length).toEqual(3);
    expect(state.contributors[2].address).toEqual(global.userAddress);
    expect(state.contributors[2].role).toEqual("user");
  });

  it("should add a new proposal", async () => {
   await schema.addProposal(
      "prop#1",
      {
        name: "name",
        description: "Name of the human",
        type: "String",
        required: true,
      } as Field
    );
    await mineBlock(global.unite.arweave);
    const state: SchemaState = await schema.readState();
    expect(state.proposals.length).toEqual(1);
    expect(state.proposals[0].name).toEqual("prop#1");
    expect(state.proposals[0].status).toEqual("proposal");
    expect(state.proposals[0].field?.name).toEqual("name");
    expect(state.proposals[0].field?.description).toEqual("Name of the human");
    expect(state.proposals[0].field?.type).toEqual("String");
    expect(state.proposals[0].field?.required).toEqual(true);
    expect(state.proposals[0].proposer).toEqual(global.userAddress);
  });

  it("should approve the proposal", async () => {
    await schema.updateProposal(0, "approved");
    await mineBlock(global.unite.arweave);
    const state: SchemaState = await schema.readState();
    expect(state.proposals[0].status).toEqual("approved");
    expect(state.releases[0].fields[0]?.name).toEqual("name");
    expect(state.releases[0].fields[0]?.description).toEqual("Name of the human");
    expect(state.releases[0].fields[0]?.type).toEqual("String");
    expect(state.releaseId).toEqual(0);
  });

  it("should add one proposal and Abandon it", async () => {
    await schema.addProposal(
      "prop#2",
      {
        name: "field#2",
        description: "description",
        type: "String",
        required: false,
      } as Field
    );
    await mineBlock(global.unite.arweave);
    await schema.updateProposal(1, "abandoned");
    await mineBlock(global.unite.arweave);
    const state: SchemaState = await schema.readState();
    expect(state.proposals[1].status).toEqual("abandoned");
  });

  it("should edit an existing and approve the proposal", async () => {
    await schema.addProposal(
      "prop#3",
      {
        name: "name",
        description: "New description",
        type: "Int",
        required: true,
      } as Field
    );
    await mineBlock(global.unite.arweave);
    await schema.updateProposal(2, "approved");
    await mineBlock(global.unite.arweave);
    const state: SchemaState = await schema.readState();
    expect(state.proposals[2].status).toEqual("approved");
    expect(state.releases[1].fields[0]?.name).toEqual("name");
    expect(state.releases[1].fields[0]?.description).toEqual("New description");
    expect(state.releases[1].fields[0]?.type).toEqual("Int");
    expect(state.releaseId).toEqual(1);
  });

  it("should add an array of objects", async () => {
    await schema.addProposal(
      "prop#4",
      {
        name: "proofs",
        description: "New description",
        type: "Proof",
        array: true,
        required: false,
      } as Field
    );
    await mineBlock(global.unite.arweave);
    await schema.updateProposal(3, "approved");
    await mineBlock(global.unite.arweave);
    const state: SchemaState = await schema.readState();
    expect(state.proposals[3].status).toEqual("approved");
    expect(state.releases[2].fields[1]?.name).toEqual("proofs");
    expect(state.releases[2].fields[1]?.description).toEqual("New description");
    expect(state.releases[2].fields[1]?.type).toEqual("Proof");
    expect(state.releases[2].fields[1]?.array).toEqual(true);
    expect(state.releaseId).toEqual(2);
  });

  it("should get the last proposal", async () => {
    const state: SchemaState = await schema.readState();
    const graphQLschema = await global.unite.getDefinition(state);
    expect(graphQLschema).toEqual(`type Human {\n  name: Int!\n  proofs: [Proof]\n}`);
  });

});
