import { UniteState, UniteContext } from "../types/types";
import { Contract } from "redstone-smartweave";

/**
 * getUnite
 *
 * @param {UniteContext} context
 * @return {{UniteState, Contract}}
 */
export default async function getUnite(context: UniteContext): Promise<{state: UniteState, unite: Contract}> {
  // Get schema state.
  const unite: Contract = context.smartweave.contract(context.uniteAddr);
  const initialState = await unite.readState();
  const state: UniteState = initialState.state as UniteState;
  return { state, unite };
}

