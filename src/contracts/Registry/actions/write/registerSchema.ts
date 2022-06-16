declare const ContractError;

export const registerSchema = async (
  state: RegistryState ,
  { caller, input: { id, address } }: RegistryAction
): Promise<RegistryResult> => {
  if (id.length === 0 || address.length === 0) {
    throw new ContractError("Invalid id or address. Both should be valid strings");
  }
  // state.schemas.push({id, address});
  state.ticker = 'Test';
  return { state };
};

