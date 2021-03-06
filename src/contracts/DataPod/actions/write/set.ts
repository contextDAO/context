declare const ContractError;

export const set = async (
  state: DataPodState,
  { caller, input: { field, value} }: DataPodAction
): Promise<DataPodResult> => {
  if (state.owner !== caller) {
    throw new ContractError("Caller is not the owner.");
  }
  state.metadata[field] = value;

  return { state };
};
