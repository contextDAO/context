import { mineBlock, schemaState } from "../src/index";
import { SchemaState } from "../src/contracts/Schema/types/types";

/**
 * createSubSchema
 */
export async function createSubSchema() {

  // Create an empty schema.
  await global.unite.createSchema(
    global.wallet,
    `Human`,
    schemaState
  );
  await mineBlock(global.unite.arweave);
  const human: SchemaState = await global.unite.getSchema(`Human`);
  expect(human.id).toEqual(`Human`);
  expect(human.contributors[0].address).toEqual(global.walletAddress);
  expect(human.contributors[0].role).toEqual("editor");
}
