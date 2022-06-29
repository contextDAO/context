"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * getSchemaContract
 *
 * @param {DappContext} dapp
 * @param {string} schemaId - Title of the schema
 * @return {Contract}
 */
async function getSchemaContract(dapp, schemaId) {
    // Get Schema address.
    const context = dapp.smartweave.contract(dapp.contextAddr);
    const interaction = await context.viewState({ function: 'getSchema', schemaId });
    if (!interaction.result.schema) {
        throw (new Error(`Invalid Schema Id`));
    }
    const contractAddr = interaction.result.schema.address;
    const contract = dapp.smartweave.contract(contractAddr);
    // Conect wallet
    if (dapp.wallet) {
        contract.connect(dapp.wallet.json);
    }
    return contract;
}
exports.default = getSchemaContract;
