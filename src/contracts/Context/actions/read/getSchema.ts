declare const ContractError;

export const getSchema = async (
  state: ContextState,
  { input: { schemaId } }: ContextAction
): Promise<PstResult> => {

  if (typeof schemaId!== "string") {
    throw new ContractError("Must specify an id");
  }

  const schema = state.schemas.find(s => s.schemaId === schemaId);
  return { result: { schema }};
};

