declare const ContractError;

export const get = async (
  state: MetadataState,
  { input: { field, id = null } }: MetadataAction
  ): Promise<MetadataResult> => {
    if (id === null) {
      return { result: { value: state.metadata[field] } };
    } else {
      const item = state.metadata[field].find(e => e.id === id);
      return { result: { value: item } };
    }
};

