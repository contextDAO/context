import {
  PstAction,
  ContractResult,
  MetadataSchemaState,
} from "./types/metadataTypes";

declare const ContractError: any;

/**
 * Main Entry point : handle
 *
 * @param {MetadataSchemaState} state
 * @param {PstAction} action
 * @return {ContractResult}
 */
export async function handle(
  state: MetadataSchemaState,
  action: PstAction
): Promise<ContractResult> {
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
