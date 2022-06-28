"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataContractSource = exports.schemaContractSource = exports.uniteContractSource = void 0;
const uniteContractSource = `
(() => {
  // src/contracts/Unite/actions/read/balance.ts
  var balance = async (state, { input: { target } }) => {
    const ticker = state.ticker;
    const balances = state.balances;
    if (typeof target !== "string") {
      throw new ContractError("Must specify target to get balance for");
    }
    if (typeof balances[target] !== "number") {
      throw new ContractError("Cannot get balance, target does not exist");
    }
    return { result: { target, ticker, balance: balances[target] } };
  };

  // src/contracts/Unite/actions/write/mintTokens.ts
  var mintTokens = async (state, { caller, input: { qty } }) => {
    const balances = state.balances;
    if (qty <= 0) {
      throw new ContractError("Invalid token mint");
    }
    if (!Number.isInteger(qty)) {
      throw new ContractError("Invalid value for qty. Must be an integer");
    }
    balances[caller] ? balances[caller] += qty : balances[caller] = qty;
    return { state };
  };

  // src/contracts/Unite/actions/write/transferTokens.ts
  var transferTokens = async (state, { caller, input: { target, qty } }) => {
    const balances = state.balances;
    if (!Number.isInteger(qty)) {
      throw new ContractError("Invalid value for qty. Must be an integer");
    }
    if (!target) {
      throw new ContractError("No target specified");
    }
    if (qty <= 0 || caller === target) {
      throw new ContractError("Invalid token transfer");
    }
    if (!balances[caller]) {
      throw new ContractError("Caller balance is not defined!");
    }
    if (balances[caller] < qty) {
      throw new ContractError("Caller balance not high enough to send token(s)!");
    }
    balances[caller] -= qty;
    if (target in balances) {
      balances[target] += qty;
    } else {
      balances[target] = qty;
    }
    return { state };
  };

  // src/contracts/Unite/actions/write/register.ts
  var register = async (state, { caller, input: { qty } }) => {
    if (qty <= 0) {
      throw new ContractError("Invalid token mint");
    }
    return { state };
  };

  // src/contracts/Unite/actions/write/registerSchema.ts
  var registerSchema = async (state, { caller, input: { schemaId, address } }) => {
    if (schemaId.length === 0 || address.length === 0) {
      throw new ContractError("Invalid id or address. Both should be valid strings");
    }
    const schema = state.schemas.find((s) => s.schemaId === schemaId);
    if (schema) {
      throw new ContractError("Schema already exists");
    }
    state.schemas.push({ schemaId, address });
    return { state };
  };

  // src/contracts/Unite/actions/write/registerData.ts
  var registerData = async (state, { caller, input: { dataId, schemaId, address } }) => {
    if (dataId.length === 0 || address.length === 0) {
      throw new ContractError("Invalid id or address. Both should be valid strings");
    }
    const findSchema = state.schemas.find((s) => s.schemaId === schemaId);
    if (!findSchema) {
      throw new ContractError("Schema does not exist");
    }
    const findData = state.data.find((s) => s.dataId === dataId);
    if (findData) {
      throw new ContractError("Data is already registered");
    }
    state.data.push({ dataId, schemaId, address });
    return { state };
  };

  // src/contracts/Unite/actions/read/getSchema.ts
  var getSchema = async (state, { input: { schemaId } }) => {
    if (typeof schemaId !== "string") {
      throw new ContractError("Must specify an id");
    }
    const schema = state.schemas.find((s) => s.schemaId === schemaId);
    return { result: { schema } };
  };

  // src/contracts/Unite/actions/read/getData.ts
  var getData = async (state, { input: { dataId } }) => {
    if (typeof dataId !== "string") {
      throw new ContractError("Must specify an id");
    }
    const data = state.data.find((s) => s.dataId === dataId);
    return { result: { data } };
  };

  // src/contracts/Unite/unite.ts
  async function handle(state, action) {
    const input = action.input;
    switch (input.function) {
      case "mint":
        return await mintTokens(state, action);
      case "transfer":
        return await transferTokens(state, action);
      case "balance":
        return await balance(state, action);
      case "register":
        return await register(state, action);
      case "registerSchema":
        return await registerSchema(state, action);
      case "getSchema":
        return await getSchema(state, action);
      case "registerData":
        return await registerData(state, action);
      case "getData":
        return await getData(state, action);
      default:
        throw new ContractError("No function supplied or function not recognised: " + input.function);
    }
  }
})();
`;
exports.uniteContractSource = uniteContractSource;
const schemaContractSource = `
(() => {
  // src/contracts/Schema/actions/write/addContributor.ts
  var addContributor = async (state, { caller }) => {
    const contributors = state.contributors;
    if (contributors.find((element) => {
      element.address === caller;
    })) {
      throw new ContractError("Caller is already a user.");
    }
    state.contributors.push({
      address: caller,
      role: "user"
    });
    return { state };
  };

  // src/contracts/Schema/actions/write/setRole.ts
  var setRole = async (state, { caller, input: { userAddr, role } }) => {
    const contributors = state.contributors;
    const editor = contributors.find((element) => element.address === caller);
    if (editor.role !== "editor") {
      throw new ContractError("Caller is not the editor.");
    }
    if (typeof userAddr !== "string") {
      throw new ContractError("Must specify a valid address");
    }
    const userId = contributors.findIndex((element) => element.address === userAddr);
    if (userId < 0) {
      throw new ContractError("User does not exist");
    }
    if (state.contributors[userId].role === "editor") {
      throw new ContractError("No war between editors allowed");
    }
    if (!["contributor", "editor", "user"].includes(role)) {
      throw new ContractError("Role must be contributor, editor or user");
    }
    state.contributors[userId].role = role;
    return { state };
  };

  // src/contracts/Schema/actions/write/addProposal.ts
  var addProposal = async (state, { caller, input: { proposalName, field } }) => {
    const contributors = state.contributors;
    const proposer = contributors.find((element) => element.address === caller);
    if (!proposer) {
      throw new ContractError("Caller is not a user.");
    }
    if (typeof proposalName !== "string" && proposalName.length < 5) {
      throw new ContractError("Invalid Name");
    }
    state.proposals.push({
      name: proposalName,
      proposer: caller,
      versionId: -1,
      status: "proposal",
      field,
      createdDate: SmartWeave.block.timestamp
    });
    return { state };
  };

  // src/contracts/Schema/actions/write/editProposal.ts
  var editProposal = async (state, { caller, input: { proposalId, status } }) => {
    const proposal = state.proposals[proposalId];
    if (!proposal) {
    }
    if (!["approved", "abandoned"].includes(status) || state.proposals[proposalId] !== "proposal") {
    }
    const editor = state.contributors.find((element) => element.address === caller);
    if (editor.role !== "editor") {
    }
    if (status === "abandoned") {
      state.proposals[proposalId].status = "abandoned";
      state.proposals[proposalId].updatedDate = SmartWeave.block.timestamp;
    } else if (status === "approved") {
      state.proposals[proposalId].status = "approved";
      state.proposals[proposalId].updatedDate = SmartWeave.block.timestamp;
      const release = {
        fields: state.releaseId === -1 ? [] : state.releases[state.releaseId].fields
      };
      const fieldId = release.fields.findIndex((field) => {
        return field.name === proposal.field.name;
      });
      if (fieldId >= 0) {
        release.fields[fieldId] = proposal.field;
      } else {
        release.fields.push(proposal.field);
      }
      state.releases.push(release);
      state.releaseId = state.releases.length - 1;
    } else {
      throw new ContractError("Invalid option");
    }
    return { state };
  };

  // src/contracts/Schema/schema.ts
  async function handle(state, action) {
    const input = action.input;
    switch (input.function) {
      case "addContributor":
        return await addContributor(state, action);
      case "setRole":
        return await setRole(state, action);
      case "addProposal":
        return await addProposal(state, action);
      case "editProposal":
        return await editProposal(state, action);
      default:
        throw new ContractError("No function supplied or function not recognised: " + input.function);
    }
  }
})();
`;
exports.schemaContractSource = schemaContractSource;
const dataContractSource = `
(() => {
  // src/contracts/Data/actions/write/addItem.ts
  var addItem = async (state, { caller, input: { field, item, id } }) => {
    if (state.owner !== caller) {
      throw new ContractError("Caller is not the owner.");
    }
    if (!state.metadata[field]) {
      state.metadata[field] = [];
    }
    item.id = id;
    state.metadata[field].push(item);
    return { state };
  };

  // src/contracts/Data/actions/write/write.ts
  var write = async (state, { caller, input: { field, value } }) => {
    if (state.owner !== caller) {
      throw new ContractError("Caller is not the owner.");
    }
    state.data[field] = value;
    return { state };
  };

  // src/contracts/Data/actions/read/read.ts
  var read = async (state, { input: { field, id = null } }) => {
    if (id === null) {
      return { result: { value: state.data[field] } };
    } else {
      const item = state.data[field].find((e) => e.id === id);
      return { result: { value: item } };
    }
  };

  // src/contracts/Data/data.ts
  async function handle(state, action) {
    const input = action.input;
    switch (input.function) {
      case "write":
        return await write(state, action);
      case "read":
        return await read(state, action);
      case "addItem":
        return await addItem(state, action);
      default:
        throw new ContractError("No function supplied or function not recognised:" + input.function);
    }
  }
})();
`;
exports.dataContractSource = dataContractSource;
