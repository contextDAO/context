import { mineBlock, writeData, getBalance } from "../../src/index";

/**
 * getBalance
 */
export default async function testGetBalance() {
  console.log('\nGET BALANCE ************' );
  const balance = await getBalance(global.context, global.editor.address);

  console.log('\nBALANCE ************', balance);
}
