import { DappContext } from "../types/types";
import { contextContractSource } from "../contracts/src";
import getContext from "../context/getContext";


/**
 * deployContext
 *
 * @param {DappContext} dapp 
 * @param {string} version
 */
export default async function evolveContext( dapp: DappContext, version: string ) {
  if (!dapp|| !dapp.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }
  const tx = await dapp.arweave.createTransaction(
    { data: contextContractSource },
    dapp.wallet.json
  )
  tx.addTag('App-Name', 'Context')
  tx.addTag('App-Version', version)
  tx.addTag('Content-Type', 'application/javascript')

  await dapp.arweave.transactions.sign(tx, dapp.wallet.json)
  const evolvedContractTxId = tx.id
  await dapp.arweave.transactions.post(tx)

  // Call evolve function.
  const context = await getContext(dapp);
  const interaction = {
    function: "evolve",
    value: evolvedContractTxId,
  };
  await context.contract.writeInteraction(interaction);
}

