import ArLocal from "arlocal";
import { Unite, testWallet, mineBlock, getAddress } from "../src/index";

const setup = async (): Promise<void> => {
  console.log('setup');
  global.arweave = new ArLocal(1984, false);
  await global.arweave.start();

  global.unite = await Unite.init("localhost" );

  global.wallet = await testWallet(global.unite.arweave);
  global.walletAddress = await getAddress(global.unite.arweave, global.wallet);
  global.contributor = await testWallet(global.unite.arweave);
  global.contributorAddress = await getAddress(global.unite.arweave, global.contributor);
  global.user = await testWallet(global.unite.arweave);
  global.userAddress = await getAddress(global.unite.arweave, global.user);

  await global.unite.deployUnite(global.wallet);
  await mineBlock(global.unite.arweave);
  console.log("Unite deployed to :" + global.unite.uniteAddr);
};

export default setup;
