"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * getContext
 *
 * @param {DappContext} dapp
 * @return {{ContextState, Contract}}
 */
async function getContext(dapp) {
    // Get schema state.
    const contract = dapp.smartweave.contract(dapp.contextAddr);
    if (dapp.wallet) {
        contract.connect(dapp.wallet.json);
    }
    const initialState = await contract.readState();
    const state = initialState.state;
    return { state, contract };
}
exports.default = getContext;
