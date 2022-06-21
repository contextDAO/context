import { Wallet } from "../types/types";
import { Network, UniteContext } from "../types/types";
/**
 * Init Unite Instance
 *
 * @param {Network} network
 * @param {JWKInterface} wallet
 * @return {Unite}
 */
export default function initContext(network: Network, wallet?: Wallet): Promise<UniteContext>;
