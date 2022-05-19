declare const ContractError;

export const addProposal= async (
  state: UniteSchemaState,
  { caller, input: {proposalName , fieldId, comment , field } }: UniteSchemaAction
): Promise<ContractResult> => {

  const contributors = state.contributors;
  const proposer = contributors.find((element: Contributor) => element.address === caller);
  if (!proposer) {
    throw new ContractError("Caller is not a user.")
  }

  if (typeof proposalName !== 'string' && proposalName.length < 5) {
    throw new ContractError('Invalid Name');
  }

  state.proposals.push({
    "name" : proposalName,
    "proposer": caller,
    "versionId" : -1,
    "status": "proposal",
    "fieldId" : fieldId,
    "field": field,
    "comments": [{
      "text": comment,
      "by": caller
    }],
  });
  return { state };
};

