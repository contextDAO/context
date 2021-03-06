declare const ContractError;

export const transferTokens = async (
  state: ContextState,
  { caller, input: { target, qty } }: ContextAction
): Promise<ContextResult> => {
  const balances = state.balances;
  if (!Number.isInteger(qty)) {
    throw new ContractError("Invalid value for qty. Must be an integer");
  }

  if (!target) {
    throw new ContractError("No target specified");
  }

  if (qty <= 0 || caller === target) {
    throw new ContractError("Invalid token transfer");
  }

  if (!(caller in balances)) {
    throw new ContractError("Caller balance is not defined!");
  }

  if (balances[caller] < qty) {
    throw new ContractError(
      "Caller balance not high enough to send token(s)!"
    );
  }

  balances[caller] -= qty;
  if (target in balances) {
    balances[target] += qty;
  } else {
    balances[target] = qty;
  }

  return { state };
}
