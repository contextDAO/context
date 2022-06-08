import fs from "fs";
import minimist from "minimist";
import { JWKInterface } from "arweave/node/lib/wallet";
import { Unite, Standard } from "../index";

type Network = "localhost" | "testnet" | "mainnet";
const main = async (network: Network, walletFile: string) => {
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
  const human: Standard = await unite.deployStandard(
    wallet,
    "human",
    "Personal information for most humans"
  );
  console.log("@human standard: " + human.contractAddr);
  const organization: Standard = await unite.deployStandard(
    wallet,
    "organization",
    "Information about organizations"
  );
  console.log("@organization standard: " + organization.contractAddr);

};

const argv = minimist(process.argv.slice(1));
main(argv.network, argv.wallet);
