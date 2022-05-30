const fs = require("fs");
const { build } = require("esbuild");
const replace = require("replace-in-file");

const contracts = ["/contracts/standard.ts", "/contracts/metadata.ts"];

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
    const standard = fs.readFileSync("./dist/standard.js").toString();
    const metadata = fs.readFileSync("./dist/metadata.js").toString();
    const fileContents = `
      const standardContractSource : string = \`\n${standard}\`;
      const metadataContractSource : string = \`\n${metadata}\`;
      export {standardContractSource, metadataContractSource };
    `;
    fs.writeFileSync("./src/contracts/src.ts", fileContents);
  });
