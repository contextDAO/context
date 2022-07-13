import { DappContext } from "../types/types";
/**
 * getBalance
 *
 * @param {DappContext} dapp
 * @param {string} address
 */
export default function getBalance(dapp: DappContext, address: string): Promise<number>;
