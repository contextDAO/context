"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../contracts/src");
const getContext_1 = __importDefault(require("../context/getContext"));
const getSchemaState_1 = __importDefault(require("../schemas/getSchemaState"));
/**
 * writeData
 *
 * @param {DappContext} dapp
 * @param {string} schemaId
 * @param {string} dataId
 * @param {object} data
 */
async function writeData(dapp, schemaId, dataId, data) {
    if (!dapp || !dapp.wallet) {
        throw (new Error(`You need to init the context and connect a wallet first`));
    }
    const context = await (0, getContext_1.default)(dapp);
    // dataId should not exist
    const registeredData = context.state.data.find((s) => s.dataId === dataId);
    if (registeredData)
        throw (new Error(`${dataId} is already registered`));
    // schemaId should exist
    const schema = context.state.schemas.find((s) => s.schemaId === schemaId);
    if (!schema)
        throw (new Error(`${schemaId} is not registered`));
    const schemaState = await (0, getSchemaState_1.default)(dapp, schemaId);
    // Create Data Contract.
    const state = {
        owner: dapp.wallet.address,
        dataId,
        schemaId,
        release: schemaState.releaseId,
        data
    };
    const contractAddr = await dapp.smartweave.createContract.deploy({
        wallet: dapp.wallet.json,
        initState: JSON.stringify(state),
        src: src_1.dataContractSource,
    });
    // Register Name.
    const interaction = {
        function: "registerData",
        dataId,
        schemaId,
        address: contractAddr,
    };
    await context.contract.writeInteraction(interaction);
    return contractAddr;
}
exports.default = writeData;
