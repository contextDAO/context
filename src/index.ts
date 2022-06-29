// Types
import { DappContext, SchemaState, Wallet } from "./types/types";
export { DappContext, SchemaState, Wallet };

// Context.
import initContext from "./context/initContext";
import deployContext from "./context/deployContext";
import connectWallet from "./context/connectWallet";
export { initContext, deployContext, connectWallet };

// Schemas
import createSchema from "./schemas/createSchema";
import getSchemaState from "./schemas/getSchemaState";
import getSchemaContract from "./schemas/getSchemaContract";
export { createSchema, getSchemaState, getSchemaContract };

import addContributor from "./schemas/addContributor";
import editContributor from "./schemas/editContributor";
export { addContributor, editContributor };

import addProposal from "./schemas/addProposal";
import editProposal from "./schemas/editProposal";
export { addProposal, editProposal };

import { Field, Proposal, ProposalStatus } from "./types/types";
export { Field, Proposal, ProposalStatus};

// Data.
import writeData from "./data/writeData";
import readData from "./data/readData";

export { writeData, readData };

// Utils.
import mineBlock from "./utils/mineBlock"
import testWallet from "./utils/testWallet"
import openWallet from "./utils/openWallet"
export { mineBlock, testWallet, openWallet };

// States.
import * as defaultState from "./utils/defaultState"
export { defaultState };

