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
exports.defaultState = exports.openWallet = exports.testWallet = exports.mineBlock = exports.readData = exports.writeData = exports.editProposal = exports.addProposal = exports.editContributor = exports.addContributor = exports.getSchemaContract = exports.getSchemaState = exports.createSchema = exports.connectWallet = exports.deployContext = exports.initContext = void 0;
// Context.
const initContext_1 = __importDefault(require("./context/initContext"));
exports.initContext = initContext_1.default;
const deployContext_1 = __importDefault(require("./context/deployContext"));
exports.deployContext = deployContext_1.default;
const connectWallet_1 = __importDefault(require("./context/connectWallet"));
exports.connectWallet = connectWallet_1.default;
// Schemas
const createSchema_1 = __importDefault(require("./schemas/createSchema"));
exports.createSchema = createSchema_1.default;
const getSchemaState_1 = __importDefault(require("./schemas/getSchemaState"));
exports.getSchemaState = getSchemaState_1.default;
const getSchemaContract_1 = __importDefault(require("./schemas/getSchemaContract"));
exports.getSchemaContract = getSchemaContract_1.default;
const addContributor_1 = __importDefault(require("./schemas/addContributor"));
exports.addContributor = addContributor_1.default;
const editContributor_1 = __importDefault(require("./schemas/editContributor"));
exports.editContributor = editContributor_1.default;
const addProposal_1 = __importDefault(require("./schemas/addProposal"));
exports.addProposal = addProposal_1.default;
const editProposal_1 = __importDefault(require("./schemas/editProposal"));
exports.editProposal = editProposal_1.default;
// Data.
const writeData_1 = __importDefault(require("./data/writeData"));
exports.writeData = writeData_1.default;
const readData_1 = __importDefault(require("./data/readData"));
exports.readData = readData_1.default;
// Utils.
const mineBlock_1 = __importDefault(require("./utils/mineBlock"));
exports.mineBlock = mineBlock_1.default;
const testWallet_1 = __importDefault(require("./utils/testWallet"));
exports.testWallet = testWallet_1.default;
const openWallet_1 = __importDefault(require("./utils/openWallet"));
exports.openWallet = openWallet_1.default;
// States.
const defaultState = __importStar(require("./utils/defaultState"));
exports.defaultState = defaultState;
