export const getSchema = async (
  state: UniteSchemaState,
  { input: {} }: PstAction
): Promise<ContractResult> => {
  const proposal = state.proposals[state.lastProposal];

  const schema = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": `ar://${SmartWeave.transaction.id}/${proposal.version}`,
    "title": state.title,
    "description": state.description,
    "type": "object",
    "properties" : {}
  }
  proposal.fields.forEach((field: Field) => {
    schema.properties[field.name] = {
      description: field.description,
      type: field.type
    }
  })
  return { result: { schema } };
};

