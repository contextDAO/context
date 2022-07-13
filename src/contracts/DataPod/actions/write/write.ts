declare const ContractError;

export const write = async (
  state: DataPodState,
  { caller, input: { field, value} }: DataPodAction
): Promise<DataPodResult> => {
  if (state.owner !== caller) {
    throw new ContractError("Caller is not the owner.");
  }
  state.data[field] = value;

  return { state };
};
