import minimist from "minimist";
import { initContext, openWallet, deployContext, createSchema, getSchemaState } from "../index";
import { DappContext } from "../types/types";
import mineBlock from "../utils/mineBlock";
import { humanState, organizationState } from "../utils/schemas";

type Network = "localhost" | "testnet" | "mainnet";
const main = async (network: Network, walletFile: string) => {
  if (!network || !walletFile) {
    console.log(
      "Usage: node deploy.js --network=mine|testnet|arweave --wallet=<json_wallet_file>"
    );
    process.exit();
  }
  const mine: boolean = network !== `mainnet`;
  const wallet = openWallet(walletFile);
  const dapp: DappContext = await initContext({ network, wallet });

  if (mine) await dapp.arweave.api.get(`/mint/${dapp.wallet?.address}/1000000000000000`);

  // Deploy Context Registry.
  console.log("Deploy Context");
  await deployContext(dapp);
  console.log("Context Registry : " + dapp.contextAddr);
  if (mine) await mineBlock(dapp.arweave);

  // Create Human Schema.
  console.log("Register Human");
  await createSchema(dapp, `Human`, humanState );
  if (mine) await mineBlock(dapp.arweave);

  // Create Organization Schema.
  console.log("Register Organization");
  await createSchema(dapp, `Org`, organizationState);
  if (mine) await mineBlock(dapp.arweave);
};

const argv = minimist(process.argv.slice(1));
main(argv.network, argv.wallet);
