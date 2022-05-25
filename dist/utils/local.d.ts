import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
export declare function testWallet(arweave: Arweave): Promise<JWKInterface>;
export declare function mineBlock(arweave: Arweave): Promise<void>;
