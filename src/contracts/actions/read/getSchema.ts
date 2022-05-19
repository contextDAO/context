export const getSchema = async (
  state: UniteSchemaState,
  { input: {} }: PstAction
): Promise<ContractResult> => {

  let proposal = state.proposals[state.lastProposal];
  const schema = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": `ar://${SmartWeave.transaction.id}/${proposal.version}`,
    "title": state.title,
    "description": state.description,
    "type": "object",
    "properties" : {}
  }

  let fields = proposal.fields;
  if (state.from.standardId !== '') {
    const standardState = await SmartWeave.contracts.readContractState(state.from.standardId)
    proposal = standardState.proposals[standardState.lastProposal];
    fields = [ ...proposal.fields, ...fields];
  }
  fields.forEach((field: Field) => {
    schema.properties[field.name] = {
      description: field.description,
      type: field.type
    }
  })
  return { result: { schema } };
};

