"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionState = void 0;
exports.collectionState = {
    schemaId: "Collection",
    releaseId: 0,
    contributors: [
        {
            address: "",
            role: "editor",
        },
    ],
    proposals: [],
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
        }],
};
