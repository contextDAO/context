/* eslint-disable no-var */
import ArLocal from "arlocal";
import { Unite } from "../src/index";
import { JWKInterface } from "arweave/node/lib/wallet";

declare global {
  var arweave: Arlocal;
  var unite: Unite;
  var wallet: JWKInterface;
  var walletAddress: string;
  var user: JWKInterface;
  var userAddress: string;
  var contributor: JWKInterface;
  var contributorAddress: string;
}

export {};
