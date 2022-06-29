import { DappContext } from "../types/types";
import { Contract } from "redstone-smartweave";
import getSchemaContract from "./getSchemaContract";

/**
 * editContributor
 *
 * @param {DappContext} dapp 
 * @param {string} id - Title of the schema
 * @param {string} userAddr - User address
 * @param {string} role - New role
 */
export default async function editContributor(dapp: DappContext, id: string, userAddr: string, role: string) {
  if (!dapp || !dapp.wallet) {
    throw(new Error(`You need to init the dapp and connect a wallet first`));
  }
  console.log("\n\nTODO : Check schema id is registered\n\n");

  const contract: Contract = await getSchemaContract(dapp, id);
  const interaction = {
    function: "setRole",
    userAddr,
    role
  };
  await contract.writeInteraction(interaction);
}

