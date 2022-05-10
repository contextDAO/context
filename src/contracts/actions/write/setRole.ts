declare const ContractError;

export const setRole = async (
  state: UniteSchemaState,
  { caller, input: { userAddr, role } }: UniteSchemaAction
): Promise<ContractResult> => {
  const contributors = state.contributors;

  // Check permissions.
  const editor = contributors.find((element: Contributor) => element.address === caller);
  if (editor.role !== 'editor') {
    throw new ContractError("Caller is not the editor.");
  }

  // Check user exists.
  if (typeof userAddr !== 'string') {
    throw new ContractError('Must specify a valid address');
  }
  
  const userId = contributors.findIndex((element: Contributor) => element.address === userAddr);
  if (userId < 0) {
    throw new ContractError('User does not exist');
  }

  if (!['contributor', 'editor', 'user'].includes(role)) {
    throw new ContractError('Role must be contributor or editor');
  }
  state.contributors[userId].role = role
  return { state };
};
