declare const ContractError;

export const getSchema = async (
  state: UniteState,
  { input: { schemaId } }: UniteAction
): Promise<PstResult> => {

  if (typeof schemaId!== "string") {
    throw new ContractError("Must specify an id");
  }

  const schema = state.schemas.find(s => s.schemaId === schemaId);
  return { result: { schema }};
};

