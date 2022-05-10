function isContributor(caller, state) {
  if (!caller in state.contributors) {
    throw new ContractError("Caller is not a contributor.");
  }
}

function isField(fieldId, state) {
  if (!state.fields[fieldId]) {
    throw new ContractError("FieldId does not exist.");
  }
}

export function handle(state, action) {
  const caller = action.caller;
  const input = action.input;

  if (input.function === 'addContributor') {
    if (caller !== state.owner) {
      throw new ContractError("Caller is not the owner.");
    }
    state.contributors.push(input.contributor);
    return { state }
  }

  if (input.function === 'addField') {
    isContributor(caller, state);
    state.fields[state.fieldId] = {
      name: input.name,
      description: input.description,
      type: input.type,
      min: input.min,
      max: input.max,
      proposer: caller,
      comments: [],
      order: state.fieldId
    };
    state.fieldId += 1;
    return { state }
  }

  if (input.function === 'addComment') {
    isContributor(caller, state);
    isField(input.fieldId, state);
    state.fields[input.fieldId].comments.push({
      comment: input.comment,
      commenter: caller
    })
    return { state }
  }

  if (input.function === 'editField') {
    const fieldId = parseInt(input.fieldId);
    isField(fieldId, state);
    if (caller !== state.fields[fieldId].proposer) {
      throw new ContractError("Caller is not a contributor.");
    }
    state.fields[fieldId].name = input.name;
    state.fields[fieldId].description = input.description;
    state.fields[fieldId].type = input.type;
    state.fields[fieldId].min = input.min;
    state.fields[fieldId].max = input.max;
    return { state }
  }

  throw new ContractError('Invalid input')
}
