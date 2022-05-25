export const getSchema = async (
  state: UniteSchemaState,
  { input: {} }: PstAction
): Promise<ContractResult> => {

  const schema = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": `ar://${SmartWeave.transaction.id}/${state.versionId}`,
    "title": state.title,
    "description": state.description,
    "type": "object",
    "properties" : {}
  }

  // const version = state.versions[state.versionId];
  let fields = state.versions[state.versionId].fields;
  if (state.from.standardId !== '') {
    const standardState = await SmartWeave.contracts.readContractState(state.from.standardId)
    const version = standardState.versions[standardState.versionId];
    fields = [ ...version.fields, ...fields];
  }
  fields.forEach((field: Field) => {
    schema.properties[field.name] = {
      description: field.description,
      type: field.type
    }
  })
  return { result: { schema } };
};

