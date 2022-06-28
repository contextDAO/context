declare const ContractError;

export const set = async (
  state: DataState,
  { caller, input: { field, value} }: DataAction
): Promise<DataResult> => {
  if (state.owner !== caller) {
    throw new ContractError("Caller is not the owner.");
  }
  state.metadata[field] = value;

  return { state };
};
