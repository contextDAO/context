declare const ContractError;

export const register = async (
  state: UniteState,
  { caller, input: { qty } }: UniteAction
): Promise<UniteResult> => {
  if (qty <= 0) {
    throw new ContractError("Invalid token mint");
  }
  return { state };
};

