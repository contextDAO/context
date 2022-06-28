import { UniteState, UniteContext } from "../types/types";
import { Contract } from "redstone-smartweave";

type Unite = {
  state: UniteState;
  contract: Contract;
}

/**
 * getUnite
 *
 * @param {UniteContext} context
 * @return {{UniteState, Contract}}
 */
export default async function getUnite(context: UniteContext): Promise<Unite> {
  // Get schema state.
  const contract: Contract = context.smartweave.contract(context.uniteAddr);
  if (context.wallet) {
    contract.connect(context.wallet.json);
  }
  const initialState = await contract.readState();
  const state: UniteState = initialState.state as UniteState;
  return {state, contract} as Unite;
}

