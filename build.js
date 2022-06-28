const fs = require("fs");
const { build } = require("esbuild");
const replace = require("replace-in-file");

const contracts = [
  "/contracts/Unite/unite.ts",
  "/contracts/Schema/schema.ts",
  "/contracts/Data/data.ts",
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
    const unite = fs.readFileSync("./dist/Unite/unite.js").toString();
    const schema = fs.readFileSync("./dist/Schema/schema.js").toString();
    const data = fs.readFileSync("./dist/Data/data.js").toString();
    const fileContents = `
      const uniteContractSource : string = \`\n${unite}\`;
      const schemaContractSource : string = \`\n${schema}\`;
      const dataContractSource : string = \`\n${data}\`;
      export {uniteContractSource, schemaContractSource, dataContractSource };
    `;
    fs.writeFileSync("./src/contracts/src.ts", fileContents);
  });
