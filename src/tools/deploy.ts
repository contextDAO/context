import minimist from "minimist";
import { initContext, openWallet, deployContext, createSchema, getSchemaState } from "../index";
import { DappContext } from "../types/types";
import mineBlock from "../utils/mineBlock";
import { humanState, organizationState } from "../utils/schemas";

type Network = "localhost" | "testnet" | "mainnet";
const main = async (network: Network, walletFile: string) => {
  if (!network || !walletFile) {
    console.log(
      "Usage: node deploy.js --network=localhost|testnet|arweave --wallet=<json_wallet_file>"
    );
    process.exit();
  }
  const localhost: boolean = network === `localhost`;
  const wallet = openWallet(walletFile);
  const dapp: DappContext = await initContext({ network, wallet });

  if (localhost) await dapp.arweave.api.get(`/mint/${dapp.wallet?.address}/1000000000000000`);

  // Deploy Context Registry.
  await deployContext(dapp);
  if (localhost) await mineBlock(dapp.arweave);

  // Create Human Schema.
  await createSchema(dapp, `Human`, humanState );
  if (localhost) await mineBlock(dapp.arweave);

  // Create Organization Schema.
  await createSchema(dapp, `Org`, organizationState);
  if (localhost) await mineBlock(dapp.arweave);

  console.log(`Context registry = ${dapp.contextAddr}`);
};

const argv = minimist(process.argv.slice(1));
main(argv.network, argv.wallet);
