import { mineBlock, getBalance } from "../../src/index";

/**
 * getBalance
 */
export default async function testGetBalance() {
  const result = await getBalance(global.context, global.editor.address);
  expect(result).toEqual(100);
}
