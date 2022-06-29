import { Wallet } from "../types/types";
import { Network, DappContext } from "../types/types";
/**
 * Init Context Instance
 *
 * @param {Network} network
 * @param {JWKInterface} wallet
 * @return {Context}
 */
export default function initContext(network: Network, wallet?: Wallet): Promise<DappContext>;
