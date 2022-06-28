import { UniteState, UniteContext } from "../types/types";
import { Contract } from "redstone-smartweave";
declare type Unite = {
    state: UniteState;
    contract: Contract;
};
/**
 * getUnite
 *
 * @param {UniteContext} context
 * @return {{UniteState, Contract}}
 */
export default function getUnite(context: UniteContext): Promise<Unite>;
export {};
