/* eslint-disable no-var */
import ArLocal from "arlocal";
import { Context } from "../src/index";
import { Wallet } from "./types";

declare global {
  var arweave: Arlocal;
  var context: Context;
  var editor: Wallet;
  var contributor: Wallet;
  var user: Wallet;
}

export {};
