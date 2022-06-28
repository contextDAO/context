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
    const contract = context.smartweave.contract(context.uniteAddr);
    if (context.wallet) {
        contract.connect(context.wallet.json);
    }
    const initialState = await contract.readState();
    const state = initialState.state;
    return { state, contract };
}
exports.default = getUnite;
