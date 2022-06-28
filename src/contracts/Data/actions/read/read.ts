declare const ContractError;

export const read = async (
  state: DataState,
  { input: { field, id = null } }: DataAction
  ): Promise<DataResult> => {
    if (id === null) {
      return { result: { value: state.data[field] } };
    } else {
      const item = state.data[field].find(e => e.id === id);
      return { result: { value: item } };
    }
};

