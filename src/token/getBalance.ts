import { DappContext } from "../types/types";
import getContext from "../context/getContext";
import { PstResult } from "../contracts/Context/types/types";

/**
 * getBalance
 *
 * @param {DappContext} dapp
 * @param {string} address
 */
export default async function getBalance(
    dapp: DappContext,
    address: string,
) : Promise<number> {
  if (!dapp || !dapp.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }

  const context = await getContext(dapp);
  const result: any = await context.contract.viewState({
    function: 'balance',
    target: address,
  });
  return result.result.balance;
}

