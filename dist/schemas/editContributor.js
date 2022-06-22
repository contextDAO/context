"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getSchemaContract_1 = __importDefault(require("./getSchemaContract"));
/**
 * editContributor
 *
 * @param {UniteContext} context
 * @param {string} id - Title of the schema
 * @param {string} userAddr - User address
 * @param {string} role - New role
 */
async function editContributor(context, id, userAddr, role) {
    if (!context || !context.wallet) {
        throw (new Error(`You need to init the context and connect a wallet first`));
    }
    console.log("\n\nTODO : Check schema id is registered\n\n");
    const contract = await (0, getSchemaContract_1.default)(context, id);
    const interaction = {
        function: "setRole",
        userAddr,
        role
    };
    await contract.writeInteraction(interaction);
}
exports.default = editContributor;
