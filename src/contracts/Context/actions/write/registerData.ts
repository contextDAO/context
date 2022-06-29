declare const ContractError;

export const registerData = async (
  state: ContextState ,
  { caller, input: { dataId, schemaId, address } }: ContextAction
): Promise<ContextResult> => {

  // Valid parameters.
  if (dataId.length === 0 || address.length === 0) {
    throw new ContractError("Invalid id or address. Both should be valid strings");
  }

  // CHeck the Schema exists.
  const findSchema = state.schemas.find(s => s.schemaId === schemaId);
  if (!findSchema) {
    throw new ContractError("Schema does not exist");
  }

  // Check the name is available.
  const findData = state.data.find(s => s.dataId === dataId);
  if (findData) {
    throw new ContractError("Data is already registered");
  }

  state.data.push({dataId, schemaId, address});
  return { state };
};

