declare const ContractError;

export const mintTokens = async (
  state: ContextState,
  { caller, input: { qty } }: ContextAction
): Promise<ContextResult> => {
  const balances = state.balances;

  if (qty <= 0) {
    throw new ContractError("Invalid token mint");
  }

  if (!Number.isInteger(qty)) {
    throw new ContractError("Invalid value for qty. Must be an integer");
  }

  balances[caller] ? (balances[caller] += qty) : (balances[caller] = qty);
  return { state };
};

