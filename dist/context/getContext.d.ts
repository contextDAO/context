import { ContextState, DappContext } from "../types/types";
import { Contract } from "redstone-smartweave";
declare type Context = {
    state: ContextState;
    contract: Contract;
};
/**
 * getContext
 *
 * @param {DappContext} dapp
 * @return {{ContextState, Contract}}
 */
export default function getContext(dapp: DappContext): Promise<Context>;
export {};
