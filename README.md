
# UniteDAO
## unite-ar-contracts
UnietDAO is a series of Smart Contract on Arweave to coordinate the  creation of standards, and we all need standards.
For example, we still lack of a common definition of the fields for the metadata of NFTs. How do I use my NFT Car in a different game if the names of the fields in the metadata are different? We can’t achieve real interoperability unless we all speak the same language.

**Example**
This is the (Opensea recommendation of metadata)[https://docs.opensea.io/docs/metadata-standards] of one NFT:
```json
{
  "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.",
  "external_url": "https://openseacreatures.io/3",
  "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
  "name": "Dave Starbelly",
  "attributes": [ ... ],
}
```

Besides name and description we don’t have specific fields. We need to coordinate the creation and evolution of the definition of fields in the metadata, so these NFTs can become interoperable.

## Here comes the Blockchain
We are using a Smart Contract to create a DAO like application to work on the standards. The Blockchain we are using is smartweave as it provides permanent storage of information. The DAPP will be based on smartweave, the smart contract language based on Javascript for arweave.

## Schemas
We are usig JSON schemas to define the different fields.
```json
{
  "$id": "ar://<txId>",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Avatar",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "The name of the avatar."
    },
    "image": {
      "type": "string",
      "description": "URL to the avatar"
    },
    "age": {
      "description": "Age in years which must be equal to or greater than zero.",
      "type": "integer",
      "minimum": 0
    }
  }
}
```

## The contract (smartweave)
The smartweave contract that we are using is keeping basic information:
- proposals : list of proposals (add, edit, open, approved, abandoned)
 - Proposal to add a new fields
 - Proposal to change a field
- contributors (editor, contributor and user).
 - editors, can add more editors and contributors
 - contributors : can change the state of a proposal
 - users : can create proposals and comment on them

Everytime a proposal to add/edit a field is approved by one of the contributors, the list of fields of that schema (standard) is aupdated and a ew version of the standard is created following semantinc versioning (major.minor.patch)
At any time, any user can comment in any of the (add/edit/open) fields.

## Build and Test

```bash
npm run build:contracts
npm test
```
