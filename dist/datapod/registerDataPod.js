"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getContext_1 = __importDefault(require("../context/getContext"));
/**
 * writeData
 *
 * @param {DappContext} dapp
 * @param {string} schemaId
 * @param {string} dataId
 * @param {string} dataAddr
 */
async function writeData(dapp, schemaId, dataId, dataAddr) {
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
    // Register Name.
    const interaction = {
        function: "registerData",
        dataId,
        schemaId,
        address: dataAddr,
    };
    await context.contract.writeInteraction(interaction);
}
exports.default = writeData;
