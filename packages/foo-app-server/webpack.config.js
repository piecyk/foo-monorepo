const { createConfig } = require("../../scripts/createConfig");

const packageName = "foo-app-server";

const configs = [
  createConfig({
    input: "server.ts",
    output: "index.js",
    isNode: true,
    packageName
  })
];

module.exports = configs;
