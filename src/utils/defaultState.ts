import { SchemaState, Proposal, Release } from "../contracts/Schema/types/types";
import { ContextSchema, ContextState, ContextData } from "../contracts/Context/types/types";
import { DataState } from "../contracts/Data/types/types";

export const context: ContextState = {
  ticker: "UDAO",
  name: "Context DAO Credits",
  owner: "",
  balances: {},
  schemas: <ContextSchema[]>[],
  data: <ContextData[]>[],
}

export const schema: SchemaState = {
  schemaId: "",
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
  dataId: "",
  schemaId: "",
  owner: "",
  release: -1,
  data: {}
};
