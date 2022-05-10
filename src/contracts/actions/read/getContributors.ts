export const getContributors = async (
  state: UniteSchemaState,
  { input: {} }: PstAction
): Promise<ContractResult> => {
  const owner = state.owner;
  const contributors = state.contributors;

  return { result: { editor: owner, contributors } };
};

