"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialMetadata = exports.initialState = void 0;
exports.initialState = {
    title: "",
    description: "",
    from: {
        standardId: "",
        version: 0,
    },
    contributorId: 0,
    proposalId: -1,
    versionId: -1,
    major: 0,
    minor: 0,
    patch: 0,
    contributors: [
        {
            address: "",
            role: "editor",
        },
    ],
    proposals: [],
    versions: [],
};
exports.initialMetadata = {
    title: "",
    description: "",
};
