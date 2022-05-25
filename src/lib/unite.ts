import path from 'path';
import fs from 'fs';
import Arweave from 'arweave';
import ArLocal from 'arlocal';
import { Contract, SmartWeave, SmartWeaveNodeFactory, LoggerFactory } from 'redstone-smartweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { initialState, initialMetadata } from '../utils/state';
import Standard from './standard'
import { UniteSchemaState, StandardFrom } from '../contracts/types/standardTypes';
import Metadata from './metadata'
import { MetadataSchemaState } from '../contracts/types/metadataTypes';

type Network = 'localhost' | 'testnet' | 'mainnet' | 'devnet';

/**
 * @class Unite
 */
export default class Unite {
  network: Network;
  arlocal: ArLocal | null;
  arweave: Arweave;
  smartweave: SmartWeave;
  standardContractSrc: string;

  /**
   * @Constructor
   * @param {Network} network 
   */
  constructor (network: Network ) {
    this.network = network;
    this.arlocal = null;
    this.arweave = {} as Arweave;
    this.smartweave = {} as SmartWeave;
    this.standardContractSrc = fs.readFileSync(path.join(__dirname, '../../dist/standard.js'), 'utf8');
  }

  /**
   * Init Unite Instance
   *
   * @param {Network} network 
   * @return {Unite}
   */
  static async init (network: Network): Promise<Unite> {
    const unite = new Unite(network);
    let connection = {};
    if (network === 'devnet') {
      unite.arlocal = new ArLocal(1820, false);
      await unite.arlocal.start();
      connection = { host: 'localhost', port: 1820, protocol: 'http' };
    } else if (network === 'localhost') {
      connection = { host: 'localhost', port: 1984, protocol: 'http' };
    } else if (network === 'testnet') {
      connection = { host: 'testnet.redstone.tools', port: 443, protocol: 'https' };
    } else if (network === 'mainnet') {
      connection = { host: 'arweave.net', port: 443, protocol: 'https' };
    }
    LoggerFactory.INST.logLevel('error');
    unite.arweave = Arweave.init(connection);
    unite.smartweave = SmartWeaveNodeFactory.memCached(unite.arweave);
    return unite;
  }

  /*
   * Stop arlocal
   */
  stop() {
    (this.network === 'devnet' && this.arlocal !== null) && this.arlocal.stop()
  }

  /**
   * getAddress
   *
   * @param {JWKInterface} wallet 
   * @return {string}
   */
  async getAddress(wallet: JWKInterface): Promise<string> {
    const address = await this.arweave.wallets.jwkToAddress(wallet);
    return address;
  }

  /**
   * getBalance for a wallet
   *
   * @param {string | JWKInterface} wallet 
   */
  async getBalance(wallet: string | JWKInterface): Promise<number> {
    const address:string = (typeof wallet === 'string') ? wallet: (await this.getAddress(wallet as JWKInterface));
    const balance = await this.arweave.wallets.getBalance(address)
    const ar = this.arweave.ar.winstonToAr(balance);
    return parseFloat(ar);
  }

  /**
   * deployStandard
   *
   * @param {JWKInterface} wallet 
   * @return {Standard}
   */
  async deployStandard(wallet: JWKInterface, title: string, description: string, standardFrom: StandardFrom = {} as StandardFrom): Promise<Standard> {
    const state: UniteSchemaState  = initialState;
    state.title = title;
    state.description = description;
    state.contributors[0].address = await this.getAddress(wallet);
    if (standardFrom.standardId) {
      state.from = standardFrom;
    }
    const contractAddr = await this.smartweave.createContract.deploy({
      wallet,
      initState: JSON.stringify(state),
      src: this.standardContractSrc,
    });

    const contract: Contract = this.smartweave.contract(contractAddr).connect(wallet);
    const standard = new Standard(wallet, contract, contractAddr);
    return standard;
  }

  /**
   * deployMetadata
   *
   * @param {JWKInterface} wallet 
   * @return {Metadata}
   */
  async deployMetadata(wallet: JWKInterface, title: string, description: string): Promise<Metadata> {
    const state: MetadataSchemaState = initialMetadata;
    state.title = title;
    state.description = description;
    const contractAddr = await this.smartweave.createContract.deploy({
      wallet,
      initState: JSON.stringify(state),
      src: this.standardContractSrc,
    });

    const contract: Contract = this.smartweave.contract(contractAddr).connect(wallet);
    const metadata = new Metadata(wallet, contract, contractAddr);
    return metadata;
  }

}
