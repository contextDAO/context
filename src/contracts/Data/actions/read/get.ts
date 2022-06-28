declare const ContractError;

export const get = async (
  state: DataState,
  { input: { field, id = null } }: DataAction
  ): Promise<DataResult> => {
    if (id === null) {
      return { result: { value: state.metadata[field] } };
    } else {
      const item = state.metadata[field].find(e => e.id === id);
      return { result: { value: item } };
    }
};

