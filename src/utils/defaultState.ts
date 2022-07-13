import { SchemaState, Proposal, Release } from "../contracts/Schema/types/types";
import { ContextSchema, ContextState, ContextData } from "../contracts/Context/types/types";
import { DataPodState } from "../contracts/DataPod/types/types";

export const context: ContextState = {
  canEvolve: true,
  ticker: "UDAO",
  name: "Context DAO Credits",
  owner: "",
  balances: {},
  schemas: <ContextSchema[]>[],
  data: <ContextData[]>[],
}

export const schema: SchemaState = {
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

export const data: DataPodState = {
  schemaId: "",
  owner: "",
  release: -1,
  data: {}
};
