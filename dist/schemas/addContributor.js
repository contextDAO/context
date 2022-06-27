"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getSchemaContract_1 = __importDefault(require("./getSchemaContract"));
/**
 * addContributor
 *
 * @param {UniteContext}context
 * @param {string} schemaId - Title of the schema
 */
async function addContributor(context, schemaId) {
    if (!context || !context.wallet) {
        throw (new Error(`You need to init the context and connect a wallet first`));
    }
    console.log("\n\nTODO : Check schema id is registered\n\n");
    const contract = await (0, getSchemaContract_1.default)(context, schemaId);
    await contract.writeInteraction({ function: "addContributor" });
}
exports.default = addContributor;
