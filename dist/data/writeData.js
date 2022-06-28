"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * createSchema
 *
 * @param {UniteContext} context
 * @param {string} id - Title of the schema
 * @param {string} schemaId - Schema
 * @param {any} data - Schema release
 */
async function writeData(context, id, schemaId, data) {
    // Check Errors.
    if (!context || !context.wallet) {
        throw (new Error(`You need to init the context and connect a wallet first`));
    }
    /*
      {state: UniteState, unite: Contract} = await getUnite(context);
    
      // id should not exist
      const uniteData = state.data.find(s => s.id === id);
      if (uniteData) throw(new Error(`${id} is already registered`));
    
      // schema should exist
      const uniteSchema = uniteState.schemas.find(s => s.id === schemaId);
      if (!uniteSchema) throw(new Error(`Schema "${schemaId}" does not exist`));
      const uniteSchemaState = await getSchemaState(context, schemaId);
    
      // Create Data Contract.
      const state: DataState = data as DataState;
      state.owner = context.wallet.address;
      state.id = id;
      state.schema = schemaId;
      state.release = uniteSchemaState.releaseId;
      const contractAddr = await context.smartweave.createContract.deploy({
        wallet: context.wallet.json,
        initState: JSON.stringify(state),
        src: dataContractSource,
      });
    
      // Register Name.
      const interaction = {
        function: "registerData",
        id,
        schema: schemaId,
        address: contractAddr,
      };
      await unite.writeInteraction(interaction);
      return contractAddr;
     */
    return "test";
}
exports.default = writeData;
;
