import { UniteState, UniteContext } from "../types/types";
import { unite } from "../utils/state";
import { uniteContractSource } from "../contracts/src";

/**
 * deployUnite
 *
 * @param {UniteContext} context
 */
export default async function deployUnite( context: UniteContext ) {
  const state: UniteState = unite;
  if (!context || !context.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }
  state.owner = context.wallet.address;
  context.uniteAddr = await context.smartweave.createContract.deploy({
    wallet: context.wallet.json,
    initState: JSON.stringify(state),
    src: uniteContractSource,
  });
}

