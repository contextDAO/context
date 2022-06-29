import { ContextState, DappContext } from "../types/types";
import { context } from "../utils/defaultState";
import { contextContractSource } from "../contracts/src";

/**
 * deployContext
 *
 * @param {DappContext} dapp 
 */
export default async function deployContext( dapp: DappContext ) {
  const state: ContextState = context;
  if (!dapp|| !dapp.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }
  state.owner = dapp.wallet.address;
  dapp.contextAddr = await dapp.smartweave.createContract.deploy({
    wallet: dapp.wallet.json,
    initState: JSON.stringify(state),
    src: contextContractSource,
  });
}

