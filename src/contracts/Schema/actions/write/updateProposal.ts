declare const ContractError;

export const updateProposal = async (
  state: SchemaState,
  { caller, input: { proposalId, status } }: SchemaAction
): Promise<SchemaResult> => {

  // Check Proposal.
  const proposal = state.proposals[proposalId];
  if (!proposal) {
    // throw new ContractError("Proposal does not exist.");
  }

  // Check valid status
  if (!["approved", "abandoned"].includes(status) 
    || state.proposals[proposalId] !== "proposal") {
    // throw new ContractError("Invalid action.");
  }

  // Check permissions. Only editor can approve.
  const editor = state.contributors.find(
    (element: Contributor) => element.address === caller
  );
  if (editor.role !== "editor") {
    // throw new ContractError("Caller is not the editor.");
  }

  if (status === "abandoned") {
    // Update status to abandoned. It it was open, set openProposal to -1.
    state.proposals[proposalId].status = "abandoned";
    state.proposals[proposalId].updatedDate = SmartWeave.block.timestamp;
  } else if (status === "approved") {
    // Add a new version.
    state.proposals[proposalId].status = "approved";
    state.proposals[proposalId].updatedDate = SmartWeave.block.timestamp;
    const release: Release = {
      fields:
        state.releaseId === -1 ? [] : state.releases[state.releaseId].fields,
    };

    const fieldId: number = release.fields.findIndex((field: Field) => {
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
