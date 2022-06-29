"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getSchemaContract_1 = __importDefault(require("./getSchemaContract"));
/**
 * addProposal
 *
 * @param {DappContext} dapp
 * @param {string} id - Title of the schema
 * @param {number} proposalId
 * @param {ProposalStatus} status
 */
async function editProposal(dapp, id, proposalId, status) {
    if (!dapp || !dapp.wallet) {
        throw (new Error(`You need to init the dapp and connect a wallet first`));
    }
    const contract = await (0, getSchemaContract_1.default)(dapp, id);
    const interaction = {
        function: "editProposal",
        proposalId,
        status,
    };
    await contract.writeInteraction(interaction);
}
exports.default = editProposal;
