declare const ContractError;

export const getSchema = async (
  state: UniteState,
  { input: { id } }: UniteAction
): Promise<PstResult> => {

  if (typeof id !== "string") {
    throw new ContractError("Must specify an id");
  }

  const schema = state.schemas.find(s => s.id === id);
  return { result: { schema }};
};

