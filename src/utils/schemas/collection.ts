import {
  SchemaState,
  Proposal,
  Release,
} from "../../contracts/Schema/types/types";

export const collectionState: SchemaState = {
  releaseId: 0,
  contributors: [
    {
      address: "",
      role: "editor",
    },
  ],
  proposals: <Proposal[]>[],
  releases: [{
    fields: [{
      name: "name",
      description: "Name of the Collection",
      type: "String",
      required: true,
    }, {
      name: "network",
      description: "Blockchain network",
      type: "Network",
      required: false,
    }, {
      name: "address",
      description: "Address of the Collection Smart Contract",
      type: "String",
      required: false,
    }, {
      name: "tokens",
      description: "Array of Tokens",
      type: "NFT",
      required: false,
      array: true,
    }]
  } as Release],
};
