declare const ContractError;

export const getData = async (
  state: ContextState,
  { input: { dataId } }: ContextAction
): Promise<DataResult> => {

  if (typeof dataId!== "string") {
    throw new ContractError("Must specify an id");
  }

  const data = state.data.find(s => s.dataId === dataId);
  return { result: { data }};
};

