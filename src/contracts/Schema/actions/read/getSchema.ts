export const getSchema = async (
  state: SchemaSTate,
  { input: {} }: SchemaAction
): Promise<SchemaResult> => {
  let items = "";
  if (state.versionId > -1) {
    const fields = state.versions[state.versionId].fields;
    fields.forEach((field: Field) => {
      const required = field.required === true ? "!" : "";
      items = items + "  " + field.name + ": " + field.type + required + "\\n";
    });
  }
  const schema = "type " + state.title+ " {\\n" + items + "}";
  return { result: { schema }};
};
