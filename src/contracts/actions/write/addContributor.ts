declare const ContractError;

export const addContributor = async (
  state: UniteSchemaState,
  { caller }: UniteSchemaAction
): Promise<ContractResult> => {
  const contributors = state.contributors;

  if (
    contributors.find((element: Contributor) => {
      element.address === caller;
    })
  ) {
    throw new ContractError("Caller is already a user.");
  }

  state.contributors[state.contributorId + 1] = {
    address: caller,
    role: "user",
  };
  state.contributorId++;
  return { state };
};
