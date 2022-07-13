declare const ContractError;

export const addItem = async (
  state: DataPodState,
  { caller, input: { field, item, id } }: DataPodAction
): Promise<DataPodResult> => {
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
