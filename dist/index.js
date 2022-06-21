"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultState = exports.testWallet = exports.mineBlock = exports.getSchema = exports.createSchema = exports.connectWallet = exports.deployUnite = exports.initContext = void 0;
// Context.
const initContext_1 = __importDefault(require("./context/initContext"));
exports.initContext = initContext_1.default;
const deployUnite_1 = __importDefault(require("./context/deployUnite"));
exports.deployUnite = deployUnite_1.default;
const connectWallet_1 = __importDefault(require("./context/connectWallet"));
exports.connectWallet = connectWallet_1.default;
// Schemas
const createSchema_1 = __importDefault(require("./schemas/createSchema"));
exports.createSchema = createSchema_1.default;
const getSchema_1 = __importDefault(require("./schemas/getSchema"));
exports.getSchema = getSchema_1.default;
// Utils.
const mineBlock_1 = __importDefault(require("./utils/mineBlock"));
exports.mineBlock = mineBlock_1.default;
const testWallet_1 = __importDefault(require("./utils/testWallet"));
exports.testWallet = testWallet_1.default;
// States.
const defaultState = __importStar(require("./utils/state"));
exports.defaultState = defaultState;
