declare const ContractError;

export const evolve = async (
  state: ContextState,
  { caller, input: { value } }: ContextAction
): Promise<ContextResult> => {

  if(state.owner !== caller) {
    throw new ContractError('Only the owner can register Data.');
  }

  if(!state.canEvolve) {
    throw new ContractError('This contract cannot evolve.');
  }

  if(state.owner !== caller) {
    throw new ContractError('Only the owner can evolve a contract.');
  }

  state.evolve = value
  return { state };
};

