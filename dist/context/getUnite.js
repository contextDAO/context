"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * getUnite
 *
 * @param {UniteContext} context
 * @return {{UniteState, Contract}}
 */
async function getUnite(context) {
    // Get schema state.
    const unite = context.smartweave.contract(context.uniteAddr);
    const initialState = await unite.readState();
    const state = initialState.state;
    return { state, unite };
}
exports.default = getUnite;
