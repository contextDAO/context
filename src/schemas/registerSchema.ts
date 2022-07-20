import getContext from "../context/getContext";
import { DappContext, ContextSchema } from "../types/types";

/**
 * registerSchema
 *
 * @param {DappContext} dapp
 * @param {string} schemaId
 * @param {string} schemaAddr
 */
export default async function registerSchema(
  dapp: DappContext,
  schemaId: string,
  schemaAddr: string
) {
  // Check Errors.
  if (!dapp || !dapp.wallet) {
    throw(new Error(`You need to init the dapp and connect a wallet first`));
  }

  const context = await getContext(dapp);

  // dataId should not exist
  const registeredSchema = context.state.schemas.find((s: ContextSchema) => s.schemaId === schemaId);
  if (registeredSchema) throw(new Error(`${schemaId} is already registered`));

  // Register Schema to Context.
  const interaction = {
    function: "registerSchema",
    schemaId,
    address: schemaAddr,
  };
  await context.contract.writeInteraction(interaction);
}

