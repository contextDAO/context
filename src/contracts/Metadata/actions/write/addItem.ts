declare const ContractError;

export const addItem = async (
  state: MetadataState,
  { caller, input: { field, item, id } }: MetadataAction
): Promise<MetadataResult> => {
  if (state.owner !== caller) {
    throw new ContractError("Caller is not the owner.");
  }
  if (!state.metadata[field]) {
    state.metadata[field] = [];
  }
  item.id = id;
  state.metadata[field].push(item);

  return { state };
};
