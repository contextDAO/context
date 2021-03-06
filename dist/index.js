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
exports.contextContractSource = exports.defaultState = exports.openWallet = exports.testWallet = exports.mineBlock = exports.updateDataPod = exports.getDataPod = exports.registerDataPod = exports.deployDataPod = exports.editProposal = exports.addProposal = exports.editContributor = exports.addContributor = exports.getSchemaContract = exports.getSchemaState = exports.registerSchema = exports.deploySchema = exports.getBalance = exports.mintTokens = exports.connectWallet = exports.evolveContext = exports.deployContext = exports.initContext = void 0;
// Context.
const initContext_1 = __importDefault(require("./context/initContext"));
exports.initContext = initContext_1.default;
const deployContext_1 = __importDefault(require("./context/deployContext"));
exports.deployContext = deployContext_1.default;
const evolveContext_1 = __importDefault(require("./context/evolveContext"));
exports.evolveContext = evolveContext_1.default;
const connectWallet_1 = __importDefault(require("./context/connectWallet"));
exports.connectWallet = connectWallet_1.default;
// Token
const mintTokens_1 = __importDefault(require("./token/mintTokens"));
exports.mintTokens = mintTokens_1.default;
const getBalance_1 = __importDefault(require("./token/getBalance"));
exports.getBalance = getBalance_1.default;
// Schemas
const deploySchema_1 = __importDefault(require("./schemas/deploySchema"));
exports.deploySchema = deploySchema_1.default;
const registerSchema_1 = __importDefault(require("./schemas/registerSchema"));
exports.registerSchema = registerSchema_1.default;
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
const deployDataPod_1 = __importDefault(require("./datapod/deployDataPod"));
exports.deployDataPod = deployDataPod_1.default;
const registerDataPod_1 = __importDefault(require("./datapod/registerDataPod"));
exports.registerDataPod = registerDataPod_1.default;
const getDataPod_1 = __importDefault(require("./datapod/getDataPod"));
exports.getDataPod = getDataPod_1.default;
const updateDataPod_1 = __importDefault(require("./datapod/updateDataPod"));
exports.updateDataPod = updateDataPod_1.default;
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
// COntract source
const src_1 = require("./contracts/src");
Object.defineProperty(exports, "contextContractSource", { enumerable: true, get: function () { return src_1.contextContractSource; } });
