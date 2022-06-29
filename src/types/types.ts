import Arweave from "arweave";
import { SmartWeave } from "redstone-smartweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { UniteState, UniteSchema, UniteData } from "../contracts/Unite/types/types";
import { SchemaState, Field, ProposalStatus } from "../contracts/Schema/types/types";
import { DataState } from "../contracts/Data/types/types";

type UniteContext = {
  network: Network;
  arweave: Arweave;
  smartweave: SmartWeave;
  uniteAddr: string; 
  wallet?: Wallet;
}

type Wallet = {
  json: JWKInterface;
  address: string;
  balance?: number;
} 

type Network = "localhost" | "testnet" | "mainnet";

export {
  Wallet,
  Network,
  UniteContext,
  UniteState,
  SchemaState,
  Field,
  ProposalStatus,
  DataState,
  UniteSchema,
  UniteData
};
