"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getUnite_1 = __importDefault(require("../context/getUnite"));
const defaultState_1 = require("../utils/defaultState");
const src_1 = require("../contracts/src");
/**
 * createSchema
 *
 * @param {UniteContext} context
 * @param {string} schemaId - Title of the schema
 * @param {SchemaState} newState
 */
async function createSchema(context, schemaId, newState) {
    // Check Errors.
    if (!context || !context.wallet) {
        throw (new Error(`You need to init the context and connect a wallet first`));
    }
    const unite = await (0, getUnite_1.default)(context);
    // dataId should not exist
    const registeredSchema = unite.state.schemas.find(s => s.schemaId === schemaId);
    if (registeredSchema)
        throw (new Error(`${schemaId} is already registered`));
    // Prepare initial state.
    const state = newState || defaultState_1.schema;
    state.schemaId = schemaId;
    state.contributors[0].address = context.wallet.address;
    // deploy Schema.
    const contractAddr = await context.smartweave.createContract.deploy({
        wallet: context.wallet?.json,
        initState: JSON.stringify(state),
        src: src_1.schemaContractSource,
    });
    // Register Schema to Unite.
    const interaction = {
        function: "registerSchema",
        schemaId,
        address: contractAddr,
    };
    await unite.contract.writeInteraction(interaction);
}
exports.default = createSchema;
