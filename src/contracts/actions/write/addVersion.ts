declare const ContractError;

export const addVersion = async (
  state: UniteSchemaState,
  { caller, input: {name, comment } }: UniteSchemaAction
): Promise<ContractResult> => {
  const contributors = state.contributors;

  const proposer = contributors.find((element: Contributor) => element.address === caller);
  if (!proposer) {
    throw new ContractError("Caller is not a user.")
  }

  if (typeof name !== 'string' && name.length < 5) {
    throw new ContractError('Invalid Name');
  }
  state.versions[state.versionId] = {
    "proposer": caller,
    "name" : name,
    "status": "proposal",
    "version" : "",
    "comments": [{
      "text": comment,
      "by": caller
    }]
  };
  state.versionId++;
  return { state };
};
