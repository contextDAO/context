import ArLocal from "arlocal";
import { initContext, testWallet, deployUnite, mineBlock } from "../src/index";

const setup = async (): Promise<void> => {

  // start Local arweave.
  global.arweave = new ArLocal(1984, false);
  await global.arweave.start();

  // Init Context.
  global.unite = await initContext(`localhost`);

  global.editor = await testWallet(global.unite.arweave);
  global.contributor = await testWallet(global.unite.arweave);
  global.user = await testWallet(global.unite.arweave);
};

export default setup;
