import { balance } from "./actions/read/balance";
import { mintTokens } from "./actions/write/mintTokens";
import { transferTokens } from "./actions/write/transferTokens";
import { register } from "./actions/write/register";
import { registerSchema } from "./actions/write/registerSchema";
import { registerData} from "./actions/write/registerData";
import { getSchema } from "./actions/read/getSchema";
import { getData} from "./actions/read/getData";
import { evolve } from "./actions/write/evolve";

import { ContextAction, ContextResult, ContextState, PstResult } from "./types/types";

declare const ContractError;

/**
 * Handle function
 *
 * @param {ContextState} state
 * @param {ContextAction} action
 * @return {ContextResult}
 */
export async function handle(
  state: ContextState,
  action: ContextAction
): Promise<ContextResult> {
  const input = action.input;

  switch (input.function) {
    case "mint":
      return await mintTokens(state, action);
    case "transfer":
      return await transferTokens(state, action);
    case "balance":
      return await balance(state, action);
    case "register":
      return await register(state, action);
    case "registerSchema":
      return await registerSchema(state, action);
    case "getSchema":
      return await getSchema(state, action);
    case "registerData":
      return await registerData(state, action);
    case "getData":
      return await getData(state, action);
    case "evolve":
      return await evolve(state, action);
    default:
      throw new ContractError(
        "No function supplied or function not recognised: " + input.function
      );
  }
}
