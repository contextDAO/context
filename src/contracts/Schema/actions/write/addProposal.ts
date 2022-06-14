declare const ContractError;

export const addProposal = async (
  state: SchemaState,
  { caller, input: { proposalName, field } }: SchemaAction
): Promise<SchemaResult> => {
  const contributors = state.contributors;
  const proposer = contributors.find(
    (element: Contributor) => element.address === caller
  );
  if (!proposer) {
    throw new ContractError("Caller is not a user.");
  }

  if (typeof proposalName !== "string" && proposalName.length < 5) {
    throw new ContractError("Invalid Name");
  }

  state.proposals.push({
    name: proposalName,
    proposer: caller,
    versionId: -1,
    status: "proposal",
    field: field,
    createdDate: SmartWeave.block.timestamp,
  });

  return { state };
};
