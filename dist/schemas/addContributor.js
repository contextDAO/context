"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getSchemaContract_1 = __importDefault(require("./getSchemaContract"));
/**
 * addContributor
 *
 * @param {DappContext} dapp
 * @param {string} schemaId - Title of the schema
 */
async function addContributor(dapp, schemaId) {
    if (!dapp || !dapp.wallet) {
        throw (new Error(`You need to init the dapp and connect a wallet first`));
    }
    const contract = await (0, getSchemaContract_1.default)(dapp, schemaId);
    await contract.writeInteraction({ function: "addContributor" });
}
exports.default = addContributor;
