import {
  DataAction,
  DataResult,
  DataState,
} from "./types/types";
import { addItem } from './actions/write/addItem';
import { set } from './actions/write/set';
import { get } from './actions/read/get';

declare const ContractError: any;

/**
 * Main Entry point : handle
 *
 * @param {DataSchemaState} state
 * @param {DataAction} action
 * @return {DataResult}
 */
export async function handle(
  state: DataState,
  action: DataAction
): Promise<DataResult> {
  const input = action.input;

  switch (input.function) {
    case 'set':
       return await set(state, action);
    case 'get':
       return await get(state, action);
    case 'addItem':
       return await addItem(state, action);
    default:
      throw new ContractError(
        "No function supplied or function not recognised:" + input.function
      );
  }
}
