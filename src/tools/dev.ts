import fs from "fs";
import path from "path";
import Arlocal from "arlocal";
import { JWKInterface } from "arweave/node/lib/wallet";
import { Unite, Schema } from "../index";
import { SchemaState } from "../contracts/Schema/types/types";
import * as states from "./schemas"

let arlocal: Arlocal;
let unite: Unite;

const prepareWallet = async (walletName: string): Promise<JWKInterface> => {
  const walletFile = path.join(__dirname, "wallets", walletName);
  const wallet: JWKInterface = JSON.parse(
    fs.readFileSync(walletFile).toString()
  );
  const walletAddress = await unite.getAddress(wallet);

  await unite.arweave.api.get(`/mint/${walletAddress}/1000000000000000`);
  return wallet; 
};

const deploySchema = async (
  wallet: JWKInterface,
  name: string,
  state: SchemaState ) => {
  const schema: Schema = await unite.deploySchema(
    wallet,
    name,
    state,
  );
  console.log(`${name} schema: ${schema.contractAddr}`);
}

const main = async () => {
  arlocal = new Arlocal(1984, false);
  await arlocal.start();
  unite = await Unite.init("localhost");
  const wallet = await prepareWallet("wallet_test_1.json");
  await prepareWallet("wallet_test_2.json");
  await prepareWallet("wallet_test_3.json");

  await deploySchema(wallet, "Human", states.humanState);
  await deploySchema(wallet, "Organization", states.organizationState);
  await deploySchema(wallet, "NFT", states.nftState);
  await deploySchema(wallet, "Collection", states.collectionState);
};

main();
