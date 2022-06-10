import {
  SchemaState,
  Proposal,
  Release,
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
  releaseId: -1,
  contributors: [
    {
      address: "",
      role: "editor",
    },
  ],
  proposals: <Proposal[]>[],
  releases: <Release[]>[],
};

export const metadataState: MetadataState = {
  title: "",
  description: "",
};
