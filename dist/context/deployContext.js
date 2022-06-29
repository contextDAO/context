"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultState_1 = require("../utils/defaultState");
const src_1 = require("../contracts/src");
/**
 * deployContext
 *
 * @param {DappContext} dapp
 */
async function deployContext(dapp) {
    const state = defaultState_1.context;
    if (!dapp || !dapp.wallet) {
        throw (new Error(`You need to init the context and connect a wallet first`));
    }
    state.owner = dapp.wallet.address;
    dapp.contextAddr = await dapp.smartweave.createContract.deploy({
        wallet: dapp.wallet.json,
        initState: JSON.stringify(state),
        src: src_1.contextContractSource,
    });
}
exports.default = deployContext;
