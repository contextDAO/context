"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * getDataContract
 *
 * @param {UniteContext} context
 * @param {string} dataId
 * @return {Contract}
 */
async function getDataContract(context, dataId) {
    // Get Schema address.
    const unite = context.smartweave.contract(context.uniteAddr);
    const interaction = await unite.viewState({ function: 'getData', dataId });
    if (!interaction.result.data) {
        throw (new Error(`Invalid Schema Id`));
    }
    const contractAddr = interaction.result.data.address;
    const contract = context.smartweave.contract(contractAddr);
    // Conect wallet
    if (context.wallet) {
        contract.connect(context.wallet.json);
    }
    return contract;
}
exports.default = getDataContract;
