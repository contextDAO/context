import Arweave from "arweave";
import { SmartWeave } from "redstone-smartweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { ContextState, ContextSchema, ContextData } from "../contracts/Context/types/types";
import { SchemaState, Field, Proposal, ProposalStatus } from "../contracts/Schema/types/types";
import { DataState } from "../contracts/Data/types/types";
declare type DappContext = {
    network: Network;
    arweave: Arweave;
    smartweave: SmartWeave;
    contextAddr: string;
    wallet?: Wallet;
};
declare type Wallet = {
    json: JWKInterface;
    address: string;
    balance?: number;
};
declare type Network = "localhost" | "testnet" | "mainnet";
export { Wallet, Network, DappContext, ContextState, SchemaState, Field, Proposal, ProposalStatus, DataState, ContextSchema, ContextData };
