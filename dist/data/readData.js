"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getUnite_1 = __importDefault(require("../context/getUnite"));
const getDataContract_1 = __importDefault(require("./getDataContract"));
/**
 * readData
 *
 * @param {UniteContext}context
 * @param {string} dataId
 */
async function readData(context, dataId) {
    if (!context || !context.wallet) {
        throw (new Error(`You need to init the context and connect a wallet first`));
    }
    const unite = await (0, getUnite_1.default)(context);
    // dataId should not exist
    const registeredData = unite.state.data.find((s) => s.dataId === dataId);
    if (!registeredData)
        throw (new Error(`${dataId} is not registered`));
    const contract = await (0, getDataContract_1.default)(context, dataId);
    const initialState = await contract.readState();
    const state = initialState.state;
    return state;
}
exports.default = readData;
