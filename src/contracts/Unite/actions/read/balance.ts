declare const ContractError;

export const balance = async (
  state: UniteState,
  { input: { target } }: UniteAction
): Promise<PstResult> => {
  const ticker = state.ticker;
  const balances = state.balances;

  if (typeof target !== "string") {
    throw new ContractError("Must specify target to get balance for");
  }

  if (typeof balances[target] !== "number") {
    throw new ContractError("Cannot get balance, target does not exist");
  }

  return { result: { target, ticker, balance: balances[target] } };
};
