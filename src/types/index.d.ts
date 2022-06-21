/* eslint-disable no-var */
import ArLocal from "arlocal";
import { Unite } from "../src/index";
import { Wallet } from "./types";

declare global {
  var arweave: Arlocal;
  var unite: Unite;
  var editor: Wallet;
  var contributor: Wallet;
  var user: Wallet;
}

export {};
