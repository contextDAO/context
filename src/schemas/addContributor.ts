import { DappContext } from "../types/types";
import { Contract } from "redstone-smartweave";
import getSchemaContract from "./getSchemaContract";

/**
 * addContributor
 *
 * @param {DappContext} dapp 
 * @param {string} schemaId - Title of the schema
 */
export default async function addContributor(dapp: DappContext, schemaId: string) {
  if (!dapp || !dapp.wallet) {
    throw(new Error(`You need to init the dapp and connect a wallet first`));
  }
  const contract: Contract = await getSchemaContract(dapp, schemaId);
  await contract.writeInteraction({ function: "addContributor" });
}

