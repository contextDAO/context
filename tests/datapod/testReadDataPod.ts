import { readDataPod } from "../../src/index";
import { DataState } from "../../src/types/types";

/**
 * testReadData 
 */
export default async function testReadDataPod() {
  const state: DataState = await readDataPod(global.context, `myNFT` );
  expect(state.owner).toEqual(global.contributor.address);
  expect(state.schemaId).toEqual(`NFT`);
  expect(state.release).toEqual(0);
  expect(state.data).toEqual({ name: 'My first NFT', image: 'ar://1234' });
}
