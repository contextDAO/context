import {
  SchemaState,
  Proposal,
  Release,
} from "../../contracts/Schema/types/types";

export const nftState: SchemaState = {
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
      name: "id",
      description: "Token ID",
      type: "Int",
      required: true,
    }, {
      name: "name",
      description: "Name of the item",
      type: "String",
      required: true,
    },{
      name: "description",
      description: "A human readable description of the item.",
      type: "String",
      required: false,
    }, {
      name: "image",
      description: "The URL to the image of the item",
      type: "String",
      required: false,
    }, {
      name: "external_url",
      description: "External URL of the item",
      type: "String",
      required: false,
    }]
  } as Release],
};
