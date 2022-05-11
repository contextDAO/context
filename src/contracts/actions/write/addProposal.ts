declare const ContractError;

export const addProposal= async (
  state: UniteSchemaState,
  { caller, input: {fieldName , fieldId, comment , field } }: UniteSchemaAction
): Promise<ContractResult> => {

  const contributors = state.contributors;
  const proposer = contributors.find((element: Contributor) => element.address === caller);
  if (!proposer) {
    throw new ContractError("Caller is not a user.")
  }

  if (typeof fieldName !== 'string' && fieldName.length < 5) {
    throw new ContractError('Invalid Name');
  }
  state.proposals[state.proposalId] = {
    "name" : fieldName,
    "proposer": caller,
    "status": "proposal",
    "fieldId" : fieldId,
    "version" : "",
    "prevProposalId" : -1,
    "comments": [{
      "text": comment,
      "by": caller
    }],
    "field": field
  };
  state.proposalId++;
  return { state };
};
