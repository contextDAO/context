import { Network, DappContext } from "../types/types";
import { JWKInterface } from "arweave/node/lib/wallet";
declare type ContextConfiguration = {
    network?: Network;
    wallet?: JWKInterface;
    address?: string;
};
/**
 * Init Context Instance
 *
 * @param {ContextConfiguration} configuration
 * @return {Context}
 */
export default function initContext(configuration: ContextConfiguration): Promise<DappContext>;
export {};
