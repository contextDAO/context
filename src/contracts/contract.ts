import { addContributor } from './actions/write/addContributor';
import { setRole } from './actions/write/setRole';
import { addVersion } from './actions/write/addVersion';
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
    case 'addVersion':
      return await addVersion(state, action);
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
