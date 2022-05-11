declare const ContractError;

export const setStatus = async (
  state: UniteSchemaState,
  { caller, input: {versionId, status, update } }: UniteSchemaAction
): Promise<ContractResult> => {

  // Check permissions.
  const editor = state.contributors.find((element: Contributor) => element.address === caller);
  if (editor.role !== 'editor') {
    throw new ContractError("Caller is not the editor.");
  }

  // Check Version.
  const versions = state.versions;
  const version: Version = versions[versionId];
  if (!version) {
    throw new ContractError("Version does not exist.")
  }

  // Update status to open.
  if (status === 'open' && version.status === 'proposal' && state.openVersion < 0) {
    state.versions[versionId].status = 'open';
    state.openVersion = versionId;
  }

  // Update status to abandoned. It it was open, set openVersion to -1.
  if (status === 'abandoned' && !['approved', 'abandoned'].includes(state.versions[versionId].status)) {
    if (state.versions[versionId].status === 'open') {
      state.openVersion = -1;
    }
    state.versions[versionId].status = 'abandoned';
  }

  // Update status to approved.
  if (status === 'approved' && version.status === 'open' && state.openVersion === versionId) {
    state.versions[versionId].status = 'approved';
    state.versions[versionId].prevVersionId = state.currentVersion;
    state.openVersion = -1;
    state.currentVersion = versionId;
    switch (update) {
      case 'major':
        state.major = state.major + 1;
        state.minor = 0;
        state.patch = 0;
        break;
      case 'minor':
        state.minor = state.minor + 1;
        state.patch = 0;
        break;
      case 'patch':
        state.patch= state.patch+ 1;
        break;
    }
    state.versions[versionId].version = `${state.major}.${state.minor}.${state.patch}`;
  }

  return { state };
};
