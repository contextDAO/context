"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
const main = async (network, walletFile) => {
    /*
    if (!network || !walletFile) {
      console.log(
        "Usage: node deploy.js --network=localhost|testnet|arweave --wallet=<json_wallet_file>"
      );
      process.exit();
    }
  
    let unite: Unite = {} as Unite;
    unite = await Unite.init(network);
    const wallet: JWKInterface = JSON.parse(
      fs.readFileSync(walletFile).toString()
    );
    const human: Schema = await unite.deploySchema(
      wallet,
      "human",
    );
    console.log("@human schema: " + human.contractAddr);
    const organization: Schema = await unite.deploySchema(
      wallet,
      "organization",
    );
    console.log("@organization schema: " + organization.contractAddr);
  */
};
const argv = (0, minimist_1.default)(process.argv.slice(1));
main(argv.network, argv.wallet);
