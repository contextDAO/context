(() => {
  // src/contracts/DataPod/actions/write/addItem.ts
  var addItem = async (state, { caller, input: { field, item, id } }) => {
    if (state.owner !== caller) {
      throw new ContractError("Caller is not the owner.");
    }
    if (!state.metadata[field]) {
      state.metadata[field] = [];
    }
    item.id = id;
    state.metadata[field].push(item);
    return { state };
  };

  // src/contracts/DataPod/actions/write/write.ts
  var write = async (state, { caller, input: { field, value } }) => {
    if (state.owner !== caller) {
      throw new ContractError("Caller is not the owner.");
    }
    state.data[field] = value;
    return { state };
  };

  // src/contracts/DataPod/actions/read/read.ts
  var read = async (state, { input: { field, id = null } }) => {
    if (id === null) {
      return { result: { value: state.data[field] } };
    } else {
      const item = state.data[field].find((e) => e.id === id);
      return { result: { value: item } };
    }
  };

  // src/contracts/DataPod/datapod.ts
  async function handle(state, action) {
    const input = action.input;
    switch (input.function) {
      case "write":
        return await write(state, action);
      case "read":
        return await read(state, action);
      case "addItem":
        return await addItem(state, action);
      default:
        throw new ContractError("No function supplied or function not recognised:" + input.function);
    }
  }
})();
