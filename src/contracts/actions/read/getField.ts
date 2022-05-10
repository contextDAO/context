declare const ContractError;

export const balance = async (
  state: UniteSchemaState,
  { input: { target } }: PstAction
): Promise<ContractResult> => {
  const fields = state.fields;

  if (typeof target !== 'number') {
    throw new ContractError('Must specify id to get the Field');
  }

  if (typeof fields[target] !== Field) {
    throw new ContractError('Cannot get FIeld, target does not exist');
  }

  return { result: { target, field: fields[target] } };
};

