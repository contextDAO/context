import {
  SchemaState,
  Proposal,
  Release,
} from "../../contracts/Schema/types/types";

export const organizationState: SchemaState = {
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
      description: "Commercial Name",
      type: "String",
      required: true,
    }, {
      name: "companyName",
      description: "Official Name",
      type: "String",
      required: false,
    }, {
      name: "url",
      description: "Link to the Organization Web Page",
      type: "String",
      required: false,
    }, {
      name: "logo",
      description: "Link to the Logo of the company",
      type: "String",
      required: false,
    }]
  } as Release],
};
