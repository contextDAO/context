import { SchemaState, Proposal, Release } from "../contracts/Schema/types/types";
import { UniteSchema, UniteState, UniteData } from "../contracts/Unite/types/types";
import { DataState } from "../contracts/Data/types/types";

export const unite: UniteState = {
  ticker: "UDAO",
  name: "Unite DAO Credits",
  owner: "",
  balances: {},
  schemas: <UniteSchema[]>[],
  data: <UniteData[]>[],
}

export const schema: SchemaState = {
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

export const data: DataState = {
  owner: "",
  id: "",
  schema: "",
  release: -1,
  metadata: {}
};
