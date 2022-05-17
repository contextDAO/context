declare const ContractError;

export const setStatus = async (
  state: UniteSchemaState,
  { caller, input: {proposalId, status, update } }: UniteSchemaAction
): Promise<ContractResult> => {

  // Check permissions.
  const editor = state.contributors.find((element: Contributor) => element.address === caller);
  if (editor.role !== 'editor') {
    throw new ContractError("Caller is not the editor.");
  }

  // Check Proposal.
  const proposals = state.proposals;
  const proposal: Proposal = proposals[proposalId];
  if (!proposal) {
    throw new ContractError("Proposal does not exist.")
  }

  if (status === 'open' && proposal.status === 'proposal' && state.openProposal < 0) {
    // Update status to open.
    state.proposals[proposalId].status = 'open';
    state.openProposal = proposalId;
  } else if (status === 'abandoned' && !['approved', 'abandoned'].includes(state.proposals[proposalId].status)) {
    // Update status to abandoned. It it was open, set openProposal to -1.
    if (state.proposals[proposalId].status === 'open') {
      state.openProposal = -1;
    }
    state.proposals[proposalId].status = 'abandoned';
  } else  if (status === 'approved' && proposal.status === 'open' && state.openProposal === proposalId) {
    // Update status to approved.
    if (state.lastProposal >= 0) {
      state.proposals[proposalId].fields = state.proposals[state.lastProposal].fields;
    } else {
      state.proposals[proposalId].fields = [];
    }
    state.proposals[proposalId].status = 'approved';
    state.proposals[proposalId].prevProposalId = state.lastProposal;
    state.openProposal = -1;
    state.lastProposal = proposalId;
    switch (update) {
      case 'major':
        state.major = state.major + 1;
        state.minor = 0;
        state.patch = 0;
        break;
      case 'minor':
        state.minor = state.minor + 1;
        state.patch = 0;
        break;
      case 'patch':
        state.patch= state.patch+ 1;
        break;
    }
    state.proposals[proposalId].version = `${state.major}.${state.minor}.${state.patch}`;

    if (proposal.fieldId < 0) {
      state.proposals[proposalId].fields.push(proposal.field);
    } else { 
      state.proposals[proposalId].fields[proposal.fieldId] = proposal.field;
    }
  } else {
    throw new ContractError("Invalid option")
  }

  return { state };
};
