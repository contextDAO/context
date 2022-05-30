"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = exports.mineBlock = exports.testWallet = exports.Standard = exports.Unite = void 0;
const unite_1 = __importDefault(require("./lib/unite"));
exports.Unite = unite_1.default;
const standard_1 = __importDefault(require("./lib/standard"));
exports.Standard = standard_1.default;
const local_1 = require("./utils/local");
Object.defineProperty(exports, "testWallet", { enumerable: true, get: function () { return local_1.testWallet; } });
Object.defineProperty(exports, "mineBlock", { enumerable: true, get: function () { return local_1.mineBlock; } });
const state_1 = require("./utils/state");
Object.defineProperty(exports, "initialState", { enumerable: true, get: function () { return state_1.initialState; } });
