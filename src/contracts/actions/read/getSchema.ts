export const getSchema = async (
  state: UniteSchemaState,
  { input: {} }: PstAction
): Promise<ContractResult> => {
  const schema: any = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "ar://" + SmartWeave.transaction.id + "/" + state.versionId,
    title: state.title,
    description: state.description,
    type: "object",
    properties: {},
  };

  if (state.versionId > -1) {
    const requiredFields: string[] = [];
    let fields = state.versions[state.versionId].fields;
    if (state.from.standardId !== "") {
      const standardState = await SmartWeave.contracts.readContractState(
        state.from.standardId
      );
      const version = standardState.versions[standardState.versionId];
      fields = [...version.fields, ...fields];
    }
    fields.forEach((field: Field) => {
      schema.properties[field.name] = {
        description: field.description,
        type: field.type,
      };
      if (field.isReadOnly) {
        schema.properties[field.name].readOnly = true;
      }
      if (field.isRequired) {
        requiredFields.push(field.name)
      }
    });
    if (requiredFields.length > 0) {
      schema.required= requiredFields;
    }

  }
  return { result: { schema } };
};
