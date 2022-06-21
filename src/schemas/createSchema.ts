import { SchemaState, UniteContext } from "../types/types";
import { schema } from "../utils/state";
import { schemaContractSource } from "../contracts/src";
import { Contract } from "redstone-smartweave";

/**
 * createSchema
 *
 * @param {UniteContext} context
 * @param {string} id - Title of the schema
 */
export default async function createSchema(context: UniteContext, id: string) {
  // Check Errors.
  if (!context || !context.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }

  console.log("\n\nTODO : Check schema id is not registered\n\n");

  // Prepare initial state.
  const state: SchemaState = schema;
  state.id = id;
  state.contributors[0].address = context.wallet.address;

  // deploy Schema.
  const contractAddr = await context.smartweave.createContract.deploy({
    wallet: context.wallet?.json,
    initState: JSON.stringify(state),
    src: schemaContractSource,
  });

  // Register Schema to Unite.
  const unite: Contract = context.smartweave
    .contract(context.uniteAddr)
    .connect(context.wallet.json);
  const interaction = {
    function: "registerSchema",
    id,
    address: contractAddr,
  };
  await unite.writeInteraction(interaction);
}

