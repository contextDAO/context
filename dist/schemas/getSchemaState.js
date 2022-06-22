"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getSchemaContract_1 = __importDefault(require("./getSchemaContract"));
/**
 * getSchemaState
 *
 * @param {UniteContext} context
 * @param {string} id - Title of the schema
 */
async function getSchemaState(context, id) {
    // Get schema state.
    const contract = await (0, getSchemaContract_1.default)(context, id);
    const initialState = await contract.readState();
    const state = initialState.state;
    return state;
}
exports.default = getSchemaState;
