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

      // Minimum and maximum values for numbers.
      if (['integer', 'number'].includes(field.type)) {
       if (field.min) {
          schema.properties[field.name].minimum = field.min;
        }
        if (field.max) {
          schema.properties[field.name].maximum = field.max;
        }
      }

      // Minimum and maximum lengths for strings.
      if (field.type === 'string') {
        if (field.min) {
          schema.properties[field.name].minLength = field.min;
        }
        if (field.max) {
          schema.properties[field.name].maxLength = field.max;
        }
      }

      // Enum
      if (field.enum) {
        schema.properties[field.name].enum = field.enum;
      }

      // Read Only.
      if (field.readOnly) {
        schema.properties[field.name].readOnly = true;
      }

      // Required
      if (field.required) {
        requiredFields.push(field.name)
      }
    });
    if (requiredFields.length > 0) {
      schema.required= requiredFields;
    }

  }
  return { result: { schema } };
};
