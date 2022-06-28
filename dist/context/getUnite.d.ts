import { UniteState, UniteContext } from "../types/types";
import { Contract } from "redstone-smartweave";
/**
 * getUnite
 *
 * @param {UniteContext} context
 * @return {{UniteState, Contract}}
 */
export default function getUnite(context: UniteContext): Promise<{
    state: UniteState;
    unite: Contract;
}>;
