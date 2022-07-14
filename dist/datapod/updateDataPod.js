"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getDataPod_1 = __importDefault(require("./getDataPod"));
/**
 * updateDataPod
 *
 * @param {DappContext} dapp
 * @param {string} dataId
 * @param {string} field
 * @param {any} value
 */
async function updateDataPod(dapp, dataId, field, value) {
    if (!dapp || !dapp.wallet) {
        throw (new Error(`You need to init the context and connect a wallet first`));
    }
    // Update DataPod.
    const { contract } = await (0, getDataPod_1.default)(dapp, dataId);
    const interaction = {
        function: "write",
        field,
        value,
    };
    await contract.writeInteraction(interaction);
}
exports.default = updateDataPod;
