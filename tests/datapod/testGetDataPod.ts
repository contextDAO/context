import { getDataPod } from "../../src/index";

/**
 * testGetDataPod
 */
export default async function testGetDataPod() {
  const { state } = await getDataPod(global.context, `myNFT` );
  expect(state.owner).toEqual(global.contributor.address);
  expect(state.schemaId).toEqual(`NFT`);
  expect(state.release).toEqual(1);
  expect(state.data).toEqual({ id: 1, name: 'My first NFT', image: 'ar://1234' });
}
