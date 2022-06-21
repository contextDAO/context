declare const ContractError;

export const registerData = async (
  state: UniteState ,
  { caller, input: { id, schema, address } }: UniteAction
): Promise<UniteResult> => {

  // Valid parameters.
  if (id.length === 0 || address.length === 0) {
    throw new ContractError("Invalid id or address. Both should be valid strings");
  }

  // CHeck the Schema exists.
  const findSchema = state.schemas.find(s => s.id === schema);
  if (!findSchema) {
    throw new ContractError("Schema does not exist");
  }

  // Check the name is available.
  const findData = state.data.find(s => s.id === id);
  if (findData) {
    throw new ContractError("Data is already registered");
  }

  state.data.push({id, schema, address});
  return { state };
};

