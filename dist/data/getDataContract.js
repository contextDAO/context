"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * getDataContract
 *
 * @param {DappContext} dapp
 * @param {string} dataId
 * @return {Contract}
 */
async function getDataContract(dapp, dataId) {
    // Get Schema address.
    const context = dapp.smartweave.contract(dapp.contextAddr);
    const interaction = await context.viewState({ function: 'getData', dataId });
    if (!interaction.result.data) {
        throw (new Error(`Invalid Schema Id`));
    }
    const contractAddr = interaction.result.data.address;
    const contract = dapp.smartweave.contract(contractAddr);
    // Conect wallet
    if (dapp.wallet) {
        contract.connect(dapp.wallet.json);
    }
    return contract;
}
exports.default = getDataContract;
