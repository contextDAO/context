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
  const wallet = await prepareWallet("wallet_test_1.json");

  unite = await Unite.init("mainnet");
  await deploySchema(wallet, "Human", states.humanState);

  unite.write(wallet, 'cryptobenkei', 'Human', {
    name: `cryptobenkei`,
    url: `https://beacons.ai/cryptobenkei`
  });

  await unite.set(wallet, `cryptobenkei`, `url`, `https://beacons.ai/cryptobenkei`);

  const benkei = await unite.read('cryptobenkei');

  unite.write(wallet, 'starkpets', 'Collection', {
    name: `starkpets`,
    url: `https://discord.gg/HepfrTpd`
  });

  await unite.addItem(wallet, `starkpets`, `tokens`, 20, {
    name: `CoolPet`,
    image: `ar://12345`
  });

  const nft = await unite.read('starkpets#tokens-20');


  console.log(benkei, nft);
};

main();
