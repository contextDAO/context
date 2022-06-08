import fs from "fs";
import path from "path";
import Arlocal from "arlocal";
import { JWKInterface } from "arweave/node/lib/wallet";
import { Unite, Standard } from "../index";

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

const main = async () => {
  arlocal = new Arlocal(1984, false);
  await arlocal.start();
  unite = await Unite.init("localhost");
  const wallet = await prepareWallet("wallet_test_1.json");
  await prepareWallet("wallet_test_2.json");
  await prepareWallet("wallet_test_3.json");
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

  const collection: Standard = await unite.deployStandard(
    wallet,
    "collection",
    "Information about collections"
  );
  console.log("@collectionstandard: " + collection.contractAddr);



};

main();
