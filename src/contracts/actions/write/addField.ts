declare const ContractError;

export const addField = async (
  state: UniteSchemaState,
  { caller, input: {fieldName , comment , field } }: UniteSchemaAction
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
    "status": "add",
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
