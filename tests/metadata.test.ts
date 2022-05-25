import { Unite, Standard, testWallet, mineBlock, initialState } from '../src/index';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { MetadataSchemaState } from '../src/contracts/types/metadataTypes';
import Metadata from '../src/lib/metadata'

describe('Testing the Unite DAO Contract', () => {
  let unite: Unite = {} as Unite;
  let wallet: JWKInterface;
  let walletAddress : string;
  let metadata: Metadata;

  beforeAll(async () => {
    unite = await Unite.init('localhost');
 });

  afterAll(async () => { 
    unite.stop()
  });

  it('Should create wallets', async () => {
    wallet = await testWallet(unite.arweave);
    const balance1 = await unite.getBalance(wallet);
    expect(balance1).toEqual(1000);
    walletAddress = await unite.getAddress(wallet);
    const balance2 = await unite.getBalance(walletAddress);
    expect(balance2).toEqual(1000);
  })

  it('Should deploy a metadata', async () => {
    metadata = await unite.deployMetadata(wallet, 'Avatar NFTs', 'The best NFTs')
    await mineBlock(unite.arweave);
    const state: MetadataSchemaState = await metadata.readState();
  });
});
