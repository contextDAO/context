import ArLocal from "arlocal";
import { Unite, testWallet } from "../src/index";

const setup = async (): Promise<void> => {
  console.log('setup');
  global.arweave = new ArLocal(1984, false);
  await global.arweave.start();

  const registryAddr = await Unite.depployRegistry();
  global.unite = await Unite.init("localhost", registryAddr);

  global.wallet = await testWallet(global.unite.arweave);
  global.walletAddress = await global.unite.getAddress(global.wallet);
  global.contributor = await testWallet(global.unite.arweave);
  global.contributorAddress = await global.unite.getAddress(global.contributor);
  global.user = await testWallet(global.unite.arweave);
  global.userAddress = await global.unite.getAddress(global.user);

};

export default setup;
