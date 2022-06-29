import ArLocal from "arlocal";
import { initContext, testWallet } from "../src/index";

const setup = async (): Promise<void> => {

  // start Local arweave.
  global.arweave = new ArLocal(1984, false);
  await global.arweave.start();

  // Init Context.
  global.context = await initContext(`localhost`);

  global.editor = await testWallet(global.context.arweave);
  global.contributor = await testWallet(global.context.arweave);
  global.user = await testWallet(global.context.arweave);
};

export default setup;
