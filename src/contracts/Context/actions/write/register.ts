declare const ContractError;

export const register = async (
  state: ContextState,
  { caller, input: { qty } }: ContextAction
): Promise<ContextResult> => {
  if (qty <= 0) {
    throw new ContractError("Invalid token mint");
  }
  return { state };
};

