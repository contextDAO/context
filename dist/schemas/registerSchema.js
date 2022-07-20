"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getContext_1 = __importDefault(require("../context/getContext"));
/**
 * registerSchema
 *
 * @param {DappContext} dapp
 * @param {string} schemaId
 * @param {string} schemaAddr
 */
async function registerSchema(dapp, schemaId, schemaAddr) {
    // Check Errors.
    if (!dapp || !dapp.wallet) {
        throw (new Error(`You need to init the dapp and connect a wallet first`));
    }
    const context = await (0, getContext_1.default)(dapp);
    // dataId should not exist
    const registeredSchema = context.state.schemas.find((s) => s.schemaId === schemaId);
    if (registeredSchema)
        throw (new Error(`${schemaId} is already registered`));
    // Register Schema to Context.
    const interaction = {
        function: "registerSchema",
        schemaId,
        address: schemaAddr,
    };
    await context.contract.writeInteraction(interaction);
}
exports.default = registerSchema;
