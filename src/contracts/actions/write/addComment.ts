declare const ContractError;

export const addComment = async (
  state: UniteSchemaState,
  { caller, input: { proposalId, text } }: UniteSchemaAction
): Promise<ContractResult> => {
  // Check caller is a valid user.
  const contributors = state.contributors;
  const proposer = contributors.find((element: Contributor) => element.address === caller);
  if (!proposer) {
    throw new ContractError("Caller is not a user.")
  }

  // Check text is a string with at least 5 characters.
  if (typeof text !== 'string' && text.length < 5) {
    throw new ContractError('Invalid Comment');
  }

  // Check this is a valid proposalId
  if (!state.proposals[proposalId] || !['proposal', 'open'].includes(state.proposals[proposalId].status)) {
    throw new ContractError('Invalid Proposal');
  }
  state.proposals[proposalId].comments.push({
    "text" : text,
    "by": caller
  });

  return { state };
};
