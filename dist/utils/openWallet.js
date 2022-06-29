"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
/**
 * openWallet
 * @param {string} walletFile
 * @return {JWKInterface}
 */
function openWallet(walletFile) {
    const json = JSON.parse(fs_1.default.readFileSync(walletFile).toString());
    return json;
}
exports.default = openWallet;
