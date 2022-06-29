"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../contracts/src");
const getUnite_1 = __importDefault(require("../context/getUnite"));
const getSchemaState_1 = __importDefault(require("../schemas/getSchemaState"));
/**
 * writeData
 *
 * @param {UniteContext}context
 * @param {string} schemaId
 * @param {string} dataId
 * @param {object} data
 */
async function writeData(context, schemaId, dataId, data) {
    if (!context || !context.wallet) {
        throw (new Error(`You need to init the context and connect a wallet first`));
    }
    const unite = await (0, getUnite_1.default)(context);
    // dataId should not exist
    const registeredData = unite.state.data.find((s) => s.dataId === dataId);
    if (registeredData)
        throw (new Error(`${dataId} is already registered`));
    // schemaId should exist
    const schema = unite.state.schemas.find((s) => s.schemaId === schemaId);
    if (!schema)
        throw (new Error(`${schemaId} is not registered`));
    const schemaState = await (0, getSchemaState_1.default)(context, schemaId);
    // Create Data Contract.
    const state = {
        owner: context.wallet.address,
        dataId,
        schemaId,
        release: schemaState.releaseId,
        data
    };
    const contractAddr = await context.smartweave.createContract.deploy({
        wallet: context.wallet.json,
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
    await unite.contract.writeInteraction(interaction);
    return contractAddr;
}
exports.default = writeData;
