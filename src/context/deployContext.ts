import { ContextState, DappContext } from "../types/types";
import { context } from "../utils/defaultState";
import { contextContractSource } from "../contracts/src";

/**
 * deployContext
 *
 * @param {DappContext} dapp 
 * @return {string}
 */
export default async function deployContext( dapp: DappContext ): Promise<string> {
  if (!dapp|| !dapp.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }

  if (dapp.contextAddr && dapp.contextAddr.length > 0) {
    const tx = await dapp.arweave.createTransaction(
      { data: contextContractSource },
      dapp.wallet.json
    )
    tx.addTag('App-Name', 'SmartWeaveContract')
    tx.addTag('App-Version', '0.3.0') 
    tx.addTag('Content-Type', 'application/javascript')

    await dapp.arweave.transactions.sign(tx, dapp.wallet.json)
    const evolvedContractTxId = tx.id
    await dapp.arweave.transactions.post(tx)
    return evolvedContractTxId

  } else {
    const state: ContextState = context;
    state.owner = dapp.wallet.address;
    dapp.contextAddr = await dapp.smartweave.createContract.deploy({
      wallet: dapp.wallet.json,
      initState: JSON.stringify(state),
      src: contextContractSource,
    });
    return dapp.contextAddr;
  }
}

