import {
  DataPodAction,
  DataPodResult,
  DataPodState,
} from "./types/types";
import { addItem } from './actions/write/addItem';
import { write } from './actions/write/write';
import { read } from './actions/read/read';

declare const ContractError: any;

/**
 * Main Entry point : handle
 *
 * @param {DataPodSchemaState} state
 * @param {DataPodAction} action
 * @return {DataPodResult}
 */
export async function handle(
  state: DataPodState,
  action: DataPodAction
): Promise<DataPodResult> {
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
