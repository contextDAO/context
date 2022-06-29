import getContext from "../context/getContext";
import { schema } from "../utils/defaultState";
import { SchemaState, DappContext, ContextSchema } from "../types/types";
import { schemaContractSource } from "../contracts/src";

/**
 * createSchema
 *
 * @param {DappContext} dapp
 * @param {string} schemaId - Title of the schema
 * @param {SchemaState} newState
 */
export default async function createSchema(dapp: DappContext, schemaId: string, newState?: SchemaState ) {
  // Check Errors.
  if (!dapp || !dapp.wallet) {
    throw(new Error(`You need to init the dapp and connect a wallet first`));
  }

  const unite = await getContext(dapp);

  // dataId should not exist
  const registeredSchema = unite.state.schemas.find((s: ContextSchema) => s.schemaId === schemaId);
  if (registeredSchema) throw(new Error(`${schemaId} is already registered`));

  // Prepare initial state.
  const state: SchemaState = newState || schema;
  state.schemaId = schemaId;
  state.contributors[0].address = dapp.wallet.address;

  // deploy Schema.
  const contractAddr = await dapp.smartweave.createContract.deploy({
    wallet: dapp.wallet?.json,
    initState: JSON.stringify(state),
    src: schemaContractSource,
  });

  // Register Schema to Context.
  const interaction = {
    function: "registerSchema",
    schemaId,
    address: contractAddr,
  };
  await unite.contract.writeInteraction(interaction);
}

