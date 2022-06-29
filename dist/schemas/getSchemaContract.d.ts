import { DappContext } from "../types/types";
import { Contract } from "redstone-smartweave";
/**
 * getSchemaContract
 *
 * @param {DappContext} dapp
 * @param {string} schemaId - Title of the schema
 * @return {Contract}
 */
export default function getSchemaContract(dapp: DappContext, schemaId: string): Promise<Contract>;
