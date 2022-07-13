"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../contracts/src");
const getContext_1 = __importDefault(require("../context/getContext"));
const getSchemaState_1 = __importDefault(require("../schemas/getSchemaState"));
/**
 * deployDataPod
 *
 * @param {DappContext} dapp
 * @param {string} schemaId
 * @param {object} data
 * @return {string} DataPod address
 */
async function deployDataPod(dapp, schemaId, data) {
    if (!dapp || !dapp.wallet) {
        throw (new Error(`You need to init the context and connect a wallet first`));
    }
    const context = await (0, getContext_1.default)(dapp);
    // schemaId should exist
    const schema = context.state.schemas.find((s) => s.schemaId === schemaId);
    if (!schema)
        throw (new Error(`${schemaId} is not registered`));
    // Create Data Contract.
    const schemaState = await (0, getSchemaState_1.default)(dapp, schemaId);
    const state = {
        owner: dapp.wallet.address,
        schemaId,
        release: schemaState.releaseId,
        data
    };
    const contractAddr = await dapp.smartweave.createContract.deploy({
        wallet: dapp.wallet.json,
        initState: JSON.stringify(state),
        src: src_1.dataPodContractSource,
    });
    return contractAddr;
}
exports.default = deployDataPod;
