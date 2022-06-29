import { Field, DappContext } from "../types/types";
/**
 * addProposal
 *
 * @param {DappContext}dapp
 * @param {string} id - Title of the schema
 * @param {string} proposalName
 * @param {Field} field
 */
export default function addProposal(dapp: DappContext, id: string, proposalName: string, field: Field): Promise<void>;
