"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaState = exports.mineBlock = exports.testWallet = exports.Schema = exports.Unite = void 0;
const unite_1 = __importDefault(require("./lib/unite"));
exports.Unite = unite_1.default;
const schema_1 = __importDefault(require("./lib/schema"));
exports.Schema = schema_1.default;
const local_1 = require("./utils/local");
Object.defineProperty(exports, "testWallet", { enumerable: true, get: function () { return local_1.testWallet; } });
Object.defineProperty(exports, "mineBlock", { enumerable: true, get: function () { return local_1.mineBlock; } });
const state_1 = require("./utils/state");
Object.defineProperty(exports, "schemaState", { enumerable: true, get: function () { return state_1.schemaState; } });
