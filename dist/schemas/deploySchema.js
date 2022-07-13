"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultState_1 = require("../utils/defaultState");
const src_1 = require("../contracts/src");
/**
 * deploySchema
 *
 * @param {DappContext} dapp
 * @param {SchemaState} newState
 * @return {string} Schema address
 */
async function deploySchema(dapp, newState) {
    // Check Errors.
    if (!dapp || !dapp.wallet) {
        throw (new Error(`You need to init the dapp and connect a wallet first`));
    }
    // Prepare initial state.
    const state = newState || defaultState_1.schema;
    state.contributors[0].address = dapp.wallet.address;
    // deploy Schema.
    const contractAddr = await dapp.smartweave.createContract.deploy({
        wallet: dapp.wallet?.json,
        initState: JSON.stringify(state),
        src: src_1.schemaContractSource,
    });
    return contractAddr;
}
exports.default = deploySchema;
