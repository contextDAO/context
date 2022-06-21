"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * getSchema
 *
 * @param {UniteContext} context
 * @param {string} id - Title of the schema
 */
async function getSchema(context, id) {
    // Get Schema address.
    const unite = context.smartweave.contract(context.uniteAddr);
    const interaction = await unite.viewState({ function: 'getSchema', id });
    if (!interaction.result.schema) {
        throw (new Error(`Invalid Schema Id`));
    }
    // Get schema state.
    const contractAddr = interaction.result.schema.address;
    const contract = context.smartweave.contract(contractAddr);
    const initialState = await contract.readState();
    const state = initialState.state;
    return state;
}
exports.default = getSchema;
