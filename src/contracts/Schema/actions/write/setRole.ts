declare const ContractError;

export const setRole = async (
  state: SchemaState,
  { caller, input: { userAddr, role } }: SchemaAction
): Promise<SchemaResult> => {
  const contributors = state.contributors;

  // Check permissions.
  const editor = contributors.find(
    (element: Contributor) => element.address === caller
  );
  // Only editor can change roles.
  if (editor.role !== "editor") {
    throw new ContractError("Caller is not the editor.");
  }

  // Check user exists.
  if (typeof userAddr !== "string") {
    throw new ContractError("Must specify a valid address");
  }

  const userId = contributors.findIndex(
    (element: Contributor) => element.address === userAddr
  );
  if (userId < 0) {
    throw new ContractError("User does not exist");
  }

  // Editor cannot downgrade other editors.
  if (state.contributors[userId].role === "editor") {
    throw new ContractError("No war between editors allowed");
  }

  if (!["contributor", "editor", "user"].includes(role)) {
    throw new ContractError("Role must be contributor, editor or user");
  }
  state.contributors[userId].role = role;
  return { state };
};
