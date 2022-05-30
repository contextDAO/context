"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadataContractSource = exports.standardContractSource = void 0;
const standardContractSource = `
(() => {
  // src/contracts/actions/write/addContributor.ts
  var addContributor = async (state, { caller }) => {
    const contributors = state.contributors;
    if (contributors.find((element) => {
      element.address === caller;
    })) {
      throw new ContractError("Caller is already a user.");
    }
    state.contributors[state.contributorId + 1] = {
      address: caller,
      role: "user"
    };
    state.contributorId++;
    return { state };
  };

  // src/contracts/actions/write/setRole.ts
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

  // src/contracts/actions/write/addProposal.ts
  var addProposal = async (state, { caller, input: { proposalName, comment, field } }) => {
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
      comments: [
        {
          text: comment,
          by: caller
        }
      ]
    });
    return { state };
  };

  // src/contracts/actions/write/addComment.ts
  var addComment = async (state, { caller, input: { proposalId, text } }) => {
    const contributors = state.contributors;
    const proposer = contributors.find((element) => element.address === caller);
    if (!proposer) {
      throw new ContractError("Caller is not a user.");
    }
    if (typeof text !== "string" && text.length < 5) {
      throw new ContractError("Invalid Comment");
    }
    if (!state.proposals[proposalId] || !["proposal", "open"].includes(state.proposals[proposalId].status)) {
      throw new ContractError("Invalid Proposal");
    }
    state.proposals[proposalId].comments.push({
      text,
      by: caller
    });
    return { state };
  };

  // src/contracts/actions/write/updateProposal.ts
  var updateProposal = async (state, { caller, input: { proposalId, status, update } }) => {
    const editor = state.contributors.find((element) => element.address === caller);
    if (editor.role !== "editor") {
      throw new ContractError("Caller is not the editor.");
    }
    const proposals = state.proposals;
    const proposal = proposals[proposalId];
    if (!proposal) {
      throw new ContractError("Proposal does not exist.");
    }
    if (status === "open" && proposal.status === "proposal" && state.proposalId === -1) {
      state.proposals[proposalId].status = "open";
      state.proposalId = proposalId;
    } else if (status === "abandoned" && !["approved", "abandoned"].includes(state.proposals[proposalId].status)) {
      state.proposalId = status === "open" ? -1 : state.proposalId;
      state.proposals[proposalId].status = "abandoned";
      state.proposalId = -1;
    } else if (status === "approved" && proposal.status === "open") {
      state.proposals[proposalId].status = "approved";
      switch (update) {
        case "major":
          state.major = state.major + 1;
          state.minor = 0;
          state.patch = 0;
          break;
        case "minor":
          state.minor = state.minor + 1;
          state.patch = 0;
          break;
        case "patch":
          state.patch = state.patch + 1;
          break;
      }
      const version = {
        proposalId,
        version: state.major + "." + state.minor + "." + state.patch,
        fields: state.versionId === -1 ? [] : state.versions[state.versionId].fields
      };
      const fieldId = version.fields.findIndex((field) => {
        return field.name === proposal.field.name;
      });
      if (fieldId >= 0) {
        version.fields[fieldId] = proposal.field;
      } else {
        version.fields.push(proposal.field);
      }
      state.versions.push(version);
      state.proposalId = -1;
      state.versionId = state.versions.length - 1;
    } else {
      throw new ContractError("Invalid option");
    }
    return { state };
  };

  // src/contracts/actions/read/getSchema.ts
  var getSchema = async (state, { input: {} }) => {
    const schema = {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      $id: "ar://" + SmartWeave.transaction.id + "/" + state.versionId,
      title: state.title,
      description: state.description,
      type: "object",
      properties: {}
    };
    if (state.versionId > -1) {
      const requiredFields = [];
      let fields = state.versions[state.versionId].fields;
      if (state.from.standardId !== "") {
        const standardState = await SmartWeave.contracts.readContractState(state.from.standardId);
        const version = standardState.versions[standardState.versionId];
        fields = [...version.fields, ...fields];
      }
      fields.forEach((field) => {
        schema.properties[field.name] = {
          description: field.description,
          type: field.type
        };
        if (field.isReadOnly) {
          schema.properties[field.name].readOnly = true;
        }
        if (field.isRequired) {
          requiredFields.push(field.name);
        }
      });
      if (requiredFields.length > 0) {
        schema.required = requiredFields;
      }
    }
    return { result: { schema } };
  };

  // src/contracts/standard.ts
  async function handle(state, action) {
    const input = action.input;
    switch (input.function) {
      case "addContributor":
        return await addContributor(state, action);
      case "setRole":
        return await setRole(state, action);
      case "addProposal":
        return await addProposal(state, action);
      case "addComment":
        return await addComment(state, action);
      case "updateProposal":
        return await updateProposal(state, action);
      case "getSchema":
        return await getSchema(state, action);
      default:
        throw new ContractError("No function supplied or function not recognised: " + input.function);
    }
  }
})();
`;
exports.standardContractSource = standardContractSource;
const metadataContractSource = `
(() => {
  // src/contracts/metadata.ts
  async function handle(state, action) {
    const input = action.input;
    switch (input.function) {
      default:
        throw new ContractError("No function supplied or function not recognised:" + input.function);
    }
  }
})();
`;
exports.metadataContractSource = metadataContractSource;
