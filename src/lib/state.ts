import { UniteSchemaState, Proposal, Version } from '../contracts/types/types';

export const initialState: UniteSchemaState = {
  "title": "",
  "description": "",
  "from": {
    "standardId" : "",
    "version" : 0
  },
  "contributorId": 0,
  "proposalId": -1,
  "versionId": -1,
  "major": 0,
  "minor": 0,
  "patch": 0,
  "contributors": [{
    "address": "",
    "role": "editor",
  }],
  "proposals": <Proposal[]>[],
  "versions": <Version[]>[],
};


