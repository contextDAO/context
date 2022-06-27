"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getSchemaContract_1 = __importDefault(require("../schemas/getSchemaContract"));
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
    const contract = await (0, getSchemaContract_1.default)(context, dataId);
    const interaction = {
        function: "addProposal",
        schemaId,
        dataId,
        data
    };
    await contract.writeInteraction(interaction);
}
exports.default = writeData;
