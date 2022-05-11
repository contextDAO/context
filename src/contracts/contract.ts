import { addContributor } from './actions/write/addContributor';
import { setRole } from './actions/write/setRole';
import { addField } from './actions/write/addField';
import { addComment } from './actions/write/addComment';
import { setStatus } from './actions/write/setStatus';
import { getContributors } from './actions/read/getContributors';
import { PstAction, ContractResult, UniteSchemaState } from './types/types';

declare const ContractError;

export async function handle(
  state: UniteSchemaState,
  action: PstAction
): Promise<ContractResult> {
  const input = action.input;

  switch (input.function) {
    case 'addContributor':
      return await addContributor(state, action);
    case 'setRole':
      return await setRole(state, action);
    case 'addField':
      return await addField(state, action);
    case 'addComment':
      return await addComment(state, action);
    case 'setStatus':
      return await setStatus(state, action);
    case 'getContributors':
      return await getContributors(state, action);
    default:
      throw new ContractError(
        `No function supplied or function not recognised: "${input.function}"`
      );
  }
}
