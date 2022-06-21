import Arweave from "arweave";

/**
 * mineBlock
 *
 * @param {Arweave} arweave 
 */
export default async function mineBlock(arweave: Arweave) {
  await arweave.api.get("mine");
}

