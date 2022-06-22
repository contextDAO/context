import Arweave from "arweave";
import { SmartWeave } from "redstone-smartweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { UniteState } from "../contracts/Unite/types/types";
import { SchemaState, Field, ProposalStatus } from "../contracts/Schema/types/types";
declare type UniteContext = {
    network: Network;
    arweave: Arweave;
    smartweave: SmartWeave;
    uniteAddr: string;
    wallet?: Wallet;
};
declare type Wallet = {
    json: JWKInterface;
    address: string;
    balance?: number;
};
declare type Network = "localhost" | "testnet" | "mainnet";
export { Wallet, Network, UniteContext, UniteState, SchemaState, Field, ProposalStatus };
