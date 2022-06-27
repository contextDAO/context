declare const ContractError;

export const write = async (
  state: DataState,
  { caller, input: { field, value} }: DataAction
): Promise<DataResult> => {
  if (state.owner !== caller) {
    throw new ContractError("Caller is not the owner.");
  }
  state.data[field] = value;

  return { state };
};
