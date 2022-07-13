import getContext from "../context/getContext";
import { DappContext } from "../types/types";

/**
 * mintTokens
 *
 * @param {DappContext} dapp
 * @param {number} qty
 */
export default async function mintTokens(dapp: DappContext, qty: number ) {
  // Check Errors.
  if (!dapp || !dapp.wallet) {
    throw(new Error(`You need to init the dapp and connect a wallet first`));
  }
  const context = await getContext(dapp);

  // Mint Tokens.
  const interaction = {
    function: "mint",
    qty,
  };
  await context.contract.writeInteraction(interaction);
}

