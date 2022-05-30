import { addContributor } from "./actions/write/addContributor";
import { setRole } from "./actions/write/setRole";
import { addProposal } from "./actions/write/addProposal";
import { addComment } from "./actions/write/addComment";
import { updateProposal } from "./actions/write/updateProposal";
import { getSchema } from "./actions/read/getSchema";
import {
  PstAction,
  ContractResult,
  UniteSchemaState,
} from "./types/standardTypes";

declare const ContractError: any;

/**
 * Main Entry point : handle
 *
 * @param {UniteSchemaState} state
 * @param {PstAction} action
 * @return {ContractResult}
 */
export async function handle(
  state: UniteSchemaState,
  action: PstAction
): Promise<ContractResult> {
  const input = action.input;

  switch (input.function) {
    case "addContributor":
      return await addContributor(state, action);
    case "setRole":
      return await setRole(state, action);
    case "addProposal":
      return await addProposal(state, action);
    case "addComment":
      return await addComment(state, action);
    case "updateProposal":
      return await updateProposal(state, action);
    case "getSchema":
      return await getSchema(state, action);
    default:
      throw new ContractError(
        "No function supplied or function not recognised: " + input.function
      );
  }
}
