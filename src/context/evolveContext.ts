import { DappContext } from "../types/types";
import getContext from "./getContext";

/**
 * deployContext
 *
 * @param {DappContext} dapp 
 * @param {string} txId
 */
export default async function evolveContext( dapp: DappContext, txId: string ) {
  if (!dapp|| !dapp.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }

  const interaction = {
    function: "evolve",
    value: txId,
  };
  console.log(interaction);

  const context = await getContext(dapp);
  await context.contract.writeInteraction(interaction);
}

