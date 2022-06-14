(() => {
  // src/contracts/Metadata/actions/write/addItem.ts
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

  // src/contracts/Metadata/actions/write/set.ts
  var set = async (state, { caller, input: { field, value } }) => {
    if (state.owner !== caller) {
      throw new ContractError("Caller is not the owner.");
    }
    state.metadata[field] = value;
    return { state };
  };

  // src/contracts/Metadata/actions/read/get.ts
  var get = async (state, { input: { field, id = null } }) => {
    if (id === null) {
      return { result: { value: state.metadata[field] } };
    } else {
      const item = state.metadata[field].find((e) => e.id === id);
      return { result: { value: item } };
    }
  };

  // src/contracts/Metadata/metadata.ts
  async function handle(state, action) {
    const input = action.input;
    switch (input.function) {
      case "set":
        return await set(state, action);
      case "get":
        return await get(state, action);
      case "addItem":
        return await addItem(state, action);
      default:
        throw new ContractError("No function supplied or function not recognised:" + input.function);
    }
  }
})();
