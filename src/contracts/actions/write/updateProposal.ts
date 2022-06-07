// import {SmartWeave} from "redstone-smartweave";

declare const ContractError;

export const updateProposal = async (
  state: UniteSchemaState,
  { caller, input: { proposalId, status, update } }: UniteSchemaAction
): Promise<ContractResult> => {
  // Check permissions.
  const editor = state.contributors.find(
    (element: Contributor) => element.address === caller
  );
  if (editor.role !== "editor") {
    throw new ContractError("Caller is not the editor.");
  }

  // Check Proposal.
  const proposals = state.proposals;
  const proposal: Proposal = proposals[proposalId];
  if (!proposal) {
    throw new ContractError("Proposal does not exist.");
  }

  if (
    status === "open" &&
    proposal.status === "proposal" &&
    state.proposalId === -1
  ) {
    // Update status to open.
    state.proposals[proposalId].status = "open";
    state.proposalId = proposalId;
    // state.openDate = SmartWeave.block.timestamp;
  } else if (
    status === "abandoned" &&
    !["approved", "abandoned"].includes(state.proposals[proposalId].status)
  ) {
    // Update status to abandoned. It it was open, set openProposal to -1.
    state.proposalId = status === "open" ? -1 : state.proposalId;
    state.proposals[proposalId].status = "abandoned";
    state.proposalId = -1;
  } else if (
    status === "approved" &&
    proposal.status === "open" &&
    ["major", "minor", "patch"].includes(update)
  ) {
    // Add a new version.
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
    const version: Version = {
      proposalId: proposalId,
      version: state.major + "." + state.minor + "." + state.patch,
      fields:
        state.versionId === -1 ? [] : state.versions[state.versionId].fields,
    };

    const fieldId: number = version.fields.findIndex((field: Field) => {
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
