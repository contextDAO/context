import { SchemaState, Proposal, Release } from "../contracts/Schema/types/types";
import { MetadataState } from "../contracts/Metadata/types/types";
import { RegistrySchema, RegistryState, RegistryName } from "../contracts/Registry/types/types";

export const registryState: RegistryState = {
  ticker: "UDAO",
  name: "Unite DAO Credits",
  owner: "",
  balances: {},
  schemas: <RegistrySchema[]>[],
  names: <RegistryName[]>[],
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
  owner: "",
  title: "",
  schema: "",
  release: -1,
  metadata: {}
};
