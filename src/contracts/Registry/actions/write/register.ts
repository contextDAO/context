declare const ContractError;

export const register = async (
  state: RegistryState,
  { caller, input: { qty } }: RegistryAction
): Promise<RegistryResult> => {
  if (qty <= 0) {
    throw new ContractError("Invalid token mint");
  }
  return { state };
};

