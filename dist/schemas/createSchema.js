"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../utils/state");
const src_1 = require("../contracts/src");
/**
 * createSchema
 *
 * @param {UniteContext} context
 * @param {string} id - Title of the schema
 */
async function createSchema(context, id) {
    // Check Errors.
    if (!context || !context.wallet) {
        throw (new Error(`You need to init the context and connect a wallet first`));
    }
    console.log("\n\nTODO : Check schema id is not registered\n\n");
    // Prepare initial state.
    const state = state_1.schema;
    state.id = id;
    state.contributors[0].address = context.wallet.address;
    // deploy Schema.
    const contractAddr = await context.smartweave.createContract.deploy({
        wallet: context.wallet?.json,
        initState: JSON.stringify(state),
        src: src_1.schemaContractSource,
    });
    // Register Schema to Unite.
    const unite = context.smartweave
        .contract(context.uniteAddr)
        .connect(context.wallet.json);
    const interaction = {
        function: "registerSchema",
        id,
        address: contractAddr,
    };
    await unite.writeInteraction(interaction);
}
exports.default = createSchema;
