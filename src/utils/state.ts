import { SchemaState, Proposal, Release } from "../contracts/Schema/types/types";
import { MetadataState } from "../contracts/Metadata/types/types";
import { UniteSchema, UniteState, UniteData } from "../contracts/Unite/types/types";

export const uniteState: UniteState = {
  ticker: "UDAO",
  name: "Unite DAO Credits",
  owner: "",
  balances: {},
  schemas: <UniteSchema[]>[],
  data: <UniteData[]>[],
}

export const schemaState: SchemaState = {
  id: "",
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
  id: "",
  schema: "",
  release: -1,
  metadata: {}
};
