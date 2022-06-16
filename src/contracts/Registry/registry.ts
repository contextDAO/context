import { balance } from "./actions/read/balance";
import { mintTokens } from "./actions/write/mintTokens";
import { transferTokens } from "./actions/write/transferTokens";
import { register } from "./actions/write/register";
// import { registerSchema } from "./actions/write/registerSchema";
import { RegistryAction, RegistryResult, RegistryState, PstResult } from "./types/types";

declare const ContractError;

/**
 * Handle function
 *
 * @param {RegistryState} state
 * @param {RegistryAction} action
 * @return {RegistryResult}
 */
export async function handle(
  state: RegistryState,
  action: RegistryAction
): Promise<RegistryResult> {
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
//    case "registerSchema":
//      return await registerSchema(state, action);
    default:
      throw new ContractError(
        "No function supplied or function not recognised: " + input.function
      );
  }
}
