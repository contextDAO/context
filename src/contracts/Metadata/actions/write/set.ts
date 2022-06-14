declare const ContractError;

export const set = async (
  state: MetadataState,
  { caller, input: { field, value} }: MetadataAction
): Promise<MetadataResult> => {
  if (state.owner !== caller) {
    throw new ContractError("Caller is not the owner.");
  }
  state.metadata[field] = value;

  return { state };
};
