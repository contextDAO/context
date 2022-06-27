declare const ContractError;

export const addItem = async (
  state: DataState,
  { caller, input: { field, item, id } }: DataAction
): Promise<DataResult> => {
  if (state.owner !== caller) {
    throw new ContractError("Caller is not the owner.");
  }
  if (!state.data[field]) {
    state.data[field] = [];
  }
  item.id = id;
  state.data[field].push(item);

  return { state };
};
