"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * getSchemaContract
 *
 * @param {UniteContext} context
 * @param {string} id - Title of the schema
 * @return {Contract}
 */
async function getSchemaContract(context, id) {
    // Get Schema address.
    const unite = context.smartweave.contract(context.uniteAddr);
    const interaction = await unite.viewState({ function: 'getSchema', id });
    if (!interaction.result.schema) {
        throw (new Error(`Invalid Schema Id`));
    }
    const contractAddr = interaction.result.schema.address;
    const contract = context.smartweave.contract(contractAddr);
    // Conect wallet
    if (context.wallet) {
        contract.connect(context.wallet.json);
    }
    return contract;
}
exports.default = getSchemaContract;
