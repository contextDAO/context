declare const ContractError;

export const registerSchema = async (
  state: UniteState ,
  { caller, input: { id, address } }: UniteAction
): Promise<UniteResult> => {
  if (id.length === 0 || address.length === 0) {
    throw new ContractError("Invalid id or address. Both should be valid strings");
  }
  const schema = state.schemas.find(s => s.id === id);
  if (schema) {
    throw new ContractError("Schema already exists");
  }
  state.schemas.push({id, address});
  return { state };
};

