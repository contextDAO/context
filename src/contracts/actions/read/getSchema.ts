export const getSchema = async (
  state: UniteSchemaState,
  { input: {} }: PstAction
): Promise<ContractResult> => {
  const propolsalId = state.lastProposal;

  const schema = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "ar://" + SmartWeave.transaction.id,
    "title": "NFT",
    "description": "Basic NFT",
    "type": "object",
    "properties" : {}
  }
  return { result: { schema } };
};

