(() => {
  // src/contracts/Unite/actions/read/balance.ts
  var balance = async (state, { input: { target } }) => {
    const ticker = state.ticker;
    const balances = state.balances;
    if (typeof target !== "string") {
      throw new ContractError("Must specify target to get balance for");
    }
    if (typeof balances[target] !== "number") {
      throw new ContractError("Cannot get balance, target does not exist");
    }
    return { result: { target, ticker, balance: balances[target] } };
  };

  // src/contracts/Unite/actions/write/mintTokens.ts
  var mintTokens = async (state, { caller, input: { qty } }) => {
    const balances = state.balances;
    if (qty <= 0) {
      throw new ContractError("Invalid token mint");
    }
    if (!Number.isInteger(qty)) {
      throw new ContractError("Invalid value for qty. Must be an integer");
    }
    balances[caller] ? balances[caller] += qty : balances[caller] = qty;
    return { state };
  };

  // src/contracts/Unite/actions/write/transferTokens.ts
  var transferTokens = async (state, { caller, input: { target, qty } }) => {
    const balances = state.balances;
    if (!Number.isInteger(qty)) {
      throw new ContractError("Invalid value for qty. Must be an integer");
    }
    if (!target) {
      throw new ContractError("No target specified");
    }
    if (qty <= 0 || caller === target) {
      throw new ContractError("Invalid token transfer");
    }
    if (!balances[caller]) {
      throw new ContractError("Caller balance is not defined!");
    }
    if (balances[caller] < qty) {
      throw new ContractError("Caller balance not high enough to send token(s)!");
    }
    balances[caller] -= qty;
    if (target in balances) {
      balances[target] += qty;
    } else {
      balances[target] = qty;
    }
    return { state };
  };

  // src/contracts/Unite/actions/write/register.ts
  var register = async (state, { caller, input: { qty } }) => {
    if (qty <= 0) {
      throw new ContractError("Invalid token mint");
    }
    return { state };
  };

  // src/contracts/Unite/actions/write/registerSchema.ts
  var registerSchema = async (state, { caller, input: { id, address } }) => {
    if (id.length === 0 || address.length === 0) {
      throw new ContractError("Invalid id or address. Both should be valid strings");
    }
    const schema = state.schemas.find((s) => s.id === id);
    if (schema) {
      throw new ContractError("Schema already exists");
    }
    state.schemas.push({ id, address });
    return { state };
  };

  // src/contracts/Unite/actions/read/getSchema.ts
  var getSchema = async (state, { input: { id } }) => {
    if (typeof id !== "string") {
      throw new ContractError("Must specify an id");
    }
    const schema = state.schemas.find((s) => s.id === id);
    return { result: { schema } };
  };

  // src/contracts/Unite/unite.ts
  async function handle(state, action) {
    const input = action.input;
    switch (input.function) {
      case "mint":
        return await mintTokens(state, action);
      case "transfer":
        return await transferTokens(state, action);
      case "balance":
        return await balance(state, action);
      case "register":
        return await register(state, action);
      case "registerSchema":
        return await registerSchema(state, action);
      case "getSchema":
        return await getSchema(state, action);
      default:
        throw new ContractError("No function supplied or function not recognised: " + input.function);
    }
  }
})();
