import {
  UniteSchemaState,
  Proposal,
  Version,
} from "../contracts/types/standardTypes";
import { MetadataSchemaState } from "../contracts/types/metadataTypes";

export const initialState: UniteSchemaState = {
  title: "",
  description: "",
  from: {
    standardId: "",
    version: 0,
  },
  contributorId: 0,
  proposalId: -1,
  versionId: -1,
  major: 0,
  minor: 0,
  patch: 0,
  contributors: [
    {
      address: "",
      role: "editor",
    },
  ],
  createdDate: 0,
  openDate: 0,
  abandonedDate: 0,
  approvedDate: 0,
  proposals: <Proposal[]>[],
  versions: <Version[]>[],
};

export const initialMetadata: MetadataSchemaState = {
  title: "",
  description: "",
};
