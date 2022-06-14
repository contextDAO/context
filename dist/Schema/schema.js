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

  // src/contracts/Schema/actions/write/updateProposal.ts
  var updateProposal = async (state, { caller, input: { proposalId, status } }) => {
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
      case "updateProposal":
        return await updateProposal(state, action);
      default:
        throw new ContractError("No function supplied or function not recognised: " + input.function);
    }
  }
})();
