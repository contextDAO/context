const fs = require("fs");
const { build } = require("esbuild");
const replace = require("replace-in-file");

const contracts = [
  "/contracts/Registry/registry.ts",
  "/contracts/Schema/schema.ts",
  "/contracts/Metadata/metadata.ts",
];

build({
  entryPoints: contracts.map((source) => {
    return `./src${source}`;
  }),
  outdir: "./dist",
  minify: false,
  bundle: true,
  format: "iife",
})
  .catch(() => process.exit(1))
  .finally(() => {
    const files = contracts.map((source) => {
      return `./dist${source}`.replace(".ts", ".js");
    });
    replace.sync({
      files: files,
      from: [/\(\(\) => {/g, /}\)\(\);/g],
      to: "",
      countMatches: true,
    });
    const registry = fs.readFileSync("./dist/Registry/registry.js").toString();
    const schema = fs.readFileSync("./dist/Schema/schema.js").toString();
    const metadata = fs.readFileSync("./dist/Metadata/metadata.js").toString();
    const fileContents = `
      const registryContractSource : string = \`\n${registry}\`;
      const schemaContractSource : string = \`\n${schema}\`;
      const metadataContractSource : string = \`\n${metadata}\`;
      export {registryContractSource, schemaContractSource, metadataContractSource };
    `;
    fs.writeFileSync("./src/contracts/src.ts", fileContents);
  });
