import { addContributor } from "./actions/write/addContributor";
import { setRole } from "./actions/write/setRole";
import { addProposal } from "./actions/write/addProposal";
import { updateProposal } from "./actions/write/updateProposal";
import {
  SchemaAction,
  SchemaResult,
  SchemaState,
} from "./types/types";

declare const ContractError: any;

/**
 * Main Entry point : handle
 *
 * @param {StandardState} state
 * @param {PstAction} action
 * @return {ContractResult}
 */
export async function handle(
  state: SchemaState,
  action: SchemaAction
): Promise<SchemaResult> {
  const input = action.input;

  switch (input.function) {
    case "addContributor":
      return await addContributor(state, action);
    case "setRole":
      return await setRole(state, action);
    case "addProposal":
      return await addProposal(state, action);
    case "updateProposal":
      return await updateProposal(state, action);
    default:
      throw new ContractError(
        "No function supplied or function not recognised: " + input.function
      );
  }
}
