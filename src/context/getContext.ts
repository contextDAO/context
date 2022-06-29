import { ContextState, DappContext } from "../types/types";
import { Contract } from "redstone-smartweave";

type Context = {
  state: ContextState;
  contract: Contract;
}

/**
 * getContext
 *
 * @param {DappContext} dapp
 * @return {{ContextState, Contract}}
 */
export default async function getContext(dapp: DappContext): Promise<Context> {
  // Get schema state.
  const contract: Contract = dapp.smartweave.contract(dapp.contextAddr);
  if (dapp.wallet) {
    contract.connect(dapp.wallet.json);
  }
  const initialState = await contract.readState();
  const state: ContextState = initialState.state as ContextState;
  return {state, contract} as Context;
}

