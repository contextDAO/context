declare const ContractError;

export const registerSchema = async (
  state: UniteState ,
  { caller, input: { schemaId, address } }: UniteAction
): Promise<UniteResult> => {
  if (schemaId.length === 0 || address.length === 0) {
    throw new ContractError("Invalid id or address. Both should be valid strings");
  }
  const schema = state.schemas.find(s => s.schemaId === schemaId);
  if (schema) {
    throw new ContractError("Schema already exists");
  }
  state.schemas.push({schemaId, address});
  return { state };
};

