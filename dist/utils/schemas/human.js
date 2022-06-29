"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.humanState = void 0;
exports.humanState = {
    schemaId: "Human",
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
                    description: "Nickname of the human",
                    type: "String",
                    required: true,
                    array: false,
                }, {
                    name: "firstName",
                    description: "First name of the human",
                    type: "String",
                    required: false,
                    array: false,
                }, {
                    name: "url",
                    description: "Link to the Human Web Page",
                    type: "String",
                    required: false,
                }, {
                    name: "avatar",
                    description: "Link to the Avatar",
                    type: "String",
                    required: false,
                }]
        }],
};
