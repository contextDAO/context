import { DappContext } from "../types/types";
/**
 * deployContext
 *
 * @param {DappContext} dapp
 * @param {string} version
 */
export default function evolveContext(dapp: DappContext, version: string): Promise<void>;
