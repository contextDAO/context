import {
  SchemaState,
  Proposal,
  Version,
} from "../contracts/Schema/types/types";
import { MetadataState } from "../contracts/Metadata/types/types";
import { RegistryState } from "../contracts/Registry/types/types";

export const registryState: RegistryState = {
  ticker: "UDAO",
  name: "Unite DAO Credits",
  owner: "",
  balances: {},
}

export const schemaState: SchemaState = {
  title: "",
  description: "",
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
  proposals: <Proposal[]>[],
  versions: <Version[]>[],
};

export const metadataState: MetadataState = {
  title: "",
  description: "",
};
