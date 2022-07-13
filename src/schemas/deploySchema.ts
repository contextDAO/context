import { schema } from "../utils/defaultState";
import { SchemaState, DappContext } from "../types/types";
import { schemaContractSource } from "../contracts/src";

/**
 * deploySchema
 *
 * @param {DappContext} dapp
 * @param {SchemaState} newState
 * @return {string} Schema address
 */
export default async function deploySchema(dapp: DappContext, newState?: SchemaState ): Promise<string> {
  // Check Errors.
  if (!dapp || !dapp.wallet) {
    throw(new Error(`You need to init the dapp and connect a wallet first`));
  }

  // Prepare initial state.
  const state: SchemaState = newState || schema;
  state.contributors[0].address = dapp.wallet.address;

  // deploy Schema.
  const contractAddr = await dapp.smartweave.createContract.deploy({
    wallet: dapp.wallet?.json,
    initState: JSON.stringify(state),
    src: schemaContractSource,
  });

  return contractAddr;
}

