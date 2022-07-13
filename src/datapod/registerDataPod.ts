import { DappContext, ContextSchema, ContextData } from "../types/types";
import getContext from "../context/getContext";

/**
 * writeData 
 *
 * @param {DappContext} dapp
 * @param {string} schemaId
 * @param {string} dataId 
 * @param {string} dataAddr
 */
export default async function writeData(
    dapp: DappContext,
    schemaId: string,
    dataId: string,
    dataAddr: string,
  ) {
  if (!dapp|| !dapp.wallet) {
    throw(new Error(`You need to init the context and connect a wallet first`));
  }

  const context = await getContext(dapp);

  // dataId should not exist
  const registeredData = context.state.data.find((s: ContextData) => s.dataId === dataId);
  if (registeredData) throw(new Error(`${dataId} is already registered`));

  // schemaId should exist
  const schema = context.state.schemas.find((s: ContextSchema) => s.schemaId === schemaId);
  if (!schema) throw(new Error(`${schemaId} is not registered`));

  // Register Name.
  const interaction = {
    function: "registerData",
    dataId,
    schemaId,
    address: dataAddr,
  };
  await context.contract.writeInteraction(interaction);
}

