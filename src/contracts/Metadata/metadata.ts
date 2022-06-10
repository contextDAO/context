import {
  MetadataAction,
  MetadataResult,
  MetadataState,
} from "./types/types";

declare const ContractError: any;

/**
 * Main Entry point : handle
 *
 * @param {MetadataSchemaState} state
 * @param {PstAction} action
 * @return {ContractResult}
 */
export async function handle(
  state: MetadataState,
  action: MetadataAction
): Promise<MetadataResult> {
  const input = action.input;

  switch (input.function) {
    // case 'addContributor':
    //   return await addContributor(state, action);
    default:
      throw new ContractError(
        "No function supplied or function not recognised:" + input.function
      );
  }
}
