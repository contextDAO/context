declare const ContractError;

export const get = async (
  state: DataPodState,
  { input: { field, id = null } }: DataPodAction
  ): Promise<DataPodResult> => {
    if (id === null) {
      return { result: { value: state.data[field] } };
    } else {
      const item = state.data[field].find(e => e.id === id);
      return { result: { value: item } };
    }
};

