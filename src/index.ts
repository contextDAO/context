// Context.
import initContext from "./context/initContext";
import deployUnite from "./context/deployUnite";
import connectWallet from "./context/connectWallet";
export { initContext, deployUnite, connectWallet };

// Schemas
import createSchema from "./schemas/createSchema";
import getSchemaState from "./schemas/getSchemaState";
import getSchemaContract from "./schemas/getSchemaContract";
import addContributor from "./schemas/addContributor";
import editContributor from "./schemas/editContributor";
import addProposal from "./schemas/addProposal";
import editProposal from "./schemas/editProposal";

export { createSchema, getSchemaState, getSchemaContract, addContributor, editContributor, addProposal, editProposal };

// Data.
import writeData from "./data/writeData";
// import readData from "./data/readData";

export { writeData };

// Utils.
import mineBlock from "./utils/mineBlock"
import testWallet from "./utils/testWallet"
export { mineBlock, testWallet };

// States.
import * as defaultState from "./utils/defaultState"
export { defaultState };

