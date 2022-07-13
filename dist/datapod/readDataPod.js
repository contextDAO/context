"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getContext_1 = __importDefault(require("../context/getContext"));
const getDataContract_1 = __importDefault(require("./getDataContract"));
/**
 * readData
 *
 * @param {DappContext} dapp
 * @param {string} dataId
 */
async function readData(dapp, dataId) {
    if (!dapp || !dapp.wallet) {
        throw (new Error(`You need to init the context and connect a wallet first`));
    }
    const context = await (0, getContext_1.default)(dapp);
    // dataId should exist
    const registeredData = context.state.data.find((s) => s.dataId === dataId);
    if (!registeredData)
        throw (new Error(`${dataId} is not registered`));
    const contract = await (0, getDataContract_1.default)(dapp, dataId);
    const initialState = await contract.readState();
    const state = initialState.state;
    return state;
}
exports.default = readData;
