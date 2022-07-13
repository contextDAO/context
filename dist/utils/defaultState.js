"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = exports.schema = exports.context = void 0;
exports.context = {
    canEvolve: true,
    ticker: "UDAO",
    name: "Context DAO Credits",
    owner: "",
    balances: {},
    schemas: [],
    data: [],
};
exports.schema = {
    releaseId: -1,
    contributors: [
        {
            address: "",
            role: "editor",
        },
    ],
    proposals: [],
    releases: [],
};
exports.data = {
    schemaId: "",
    owner: "",
    release: -1,
    data: {}
};
