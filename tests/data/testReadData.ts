import { readData } from "../../src/index";
import { DataState } from "../../src/types/types";

/**
 * testReadData 
 */
export default async function testReadData() {
  const state: DataState = await readData(global.unite, `myNFT` );
  expect(state.owner).toEqual(global.contributor.address);
  expect(state.dataId).toEqual(`myNFT`);
  expect(state.schemaId).toEqual(`NFT`);
  expect(state.release).toEqual(0);
  expect(state.data).toEqual({ name: 'My first NFT', image: 'ar://1234' });
}
