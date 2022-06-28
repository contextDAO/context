import {
  DataAction,
  DataResult,
  DataState,
} from "./types/types";
import { addItem } from './actions/write/addItem';
import { write } from './actions/write/write';
import { read } from './actions/read/read';

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
    case 'write':
       return await write(state, action);
    case 'read':
       return await read(state, action);
    case 'addItem':
       return await addItem(state, action);
    default:
      throw new ContractError(
        "No function supplied or function not recognised:" + input.function
      );
  }
}
