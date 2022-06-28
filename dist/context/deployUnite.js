"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultState_1 = require("../utils/defaultState");
const src_1 = require("../contracts/src");
/**
 * deployUnite
 *
 * @param {UniteContext} context
 */
async function deployUnite(context) {
    const state = defaultState_1.unite;
    if (!context || !context.wallet) {
        throw (new Error(`You need to init the context and connect a wallet first`));
    }
    state.owner = context.wallet.address;
    context.uniteAddr = await context.smartweave.createContract.deploy({
        wallet: context.wallet.json,
        initState: JSON.stringify(state),
        src: src_1.uniteContractSource,
    });
}
exports.default = deployUnite;
