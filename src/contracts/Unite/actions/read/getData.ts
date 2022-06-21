declare const ContractError;

export const getData = async (
  state: UniteState,
  { input: { id } }: UniteAction
): Promise<DataResult> => {

  if (typeof id !== "string") {
    throw new ContractError("Must specify an id");
  }

  const data = state.data.find(s => s.id === id);
  return { result: { data }};
};

