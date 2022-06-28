import getUnite from "../context/getUnite";
import { SchemaState, UniteContext } from "../types/types";
import { schema } from "../utils/defaultState";
import { schemaContractSource } from "../contracts/src";
import { Contract } from "redstone-smartweave";

/**
 * createSchema
 *
 * @param {UniteContext} context
 * @param {string} schemaId - Title of the schema
 * @param {SchemaState} newState
 */
export default async function createSchema(context: UniteContext, schemaId: string, newState?: SchemaState ) {
  // Check Errors.
  if (!context || !context.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }

  const unite = await getUnite(context);

  // dataId should not exist
  const registeredSchema = unite.state.schemas.find(s => s.schemaId === schemaId);
  if (registeredSchema) throw(new Error(`${schemaId} is already registered`));

  // Prepare initial state.
  const state: SchemaState = newState || schema;
  state.schemaId = schemaId;
  state.contributors[0].address = context.wallet.address;

  // deploy Schema.
  const contractAddr = await context.smartweave.createContract.deploy({
    wallet: context.wallet?.json,
    initState: JSON.stringify(state),
    src: schemaContractSource,
  });

  // Register Schema to Unite.
  const interaction = {
    function: "registerSchema",
    schemaId,
    address: contractAddr,
  };
  await unite.contract.writeInteraction(interaction);
}

