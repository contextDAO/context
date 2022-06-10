(() => {
  // src/contracts/Metadata/metadata.ts
  async function handle(state, action) {
    const input = action.input;
    switch (input.function) {
      default:
        throw new ContractError("No function supplied or function not recognised:" + input.function);
    }
  }
})();
