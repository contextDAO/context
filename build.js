const fs = require("fs");
const { build } = require("esbuild");
const replace = require("replace-in-file");

const contracts = [
  "/contracts/Context/context.ts",
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
    const context = fs.readFileSync("./dist/Context/context.js").toString();
    const schema = fs.readFileSync("./dist/Schema/schema.js").toString();
    const data = fs.readFileSync("./dist/Data/data.js").toString();
    const fileContents = `
      const contextContractSource : string = \`\n${context}\`;
      const schemaContractSource : string = \`\n${schema}\`;
      const dataContractSource : string = \`\n${data}\`;
      export {contextContractSource, schemaContractSource, dataContractSource };
    `;
    fs.writeFileSync("./src/contracts/src.ts", fileContents);
  });
