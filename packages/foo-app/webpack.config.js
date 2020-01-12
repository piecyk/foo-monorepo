const path = require("path");
const { createConfig, fromPaths } = require("../../scripts/createConfig");

const packageName = "foo-app";
const { srcPath } = fromPaths({ packageName });

const mainInput = "index.ts";
const mainEntry = path.join(srcPath, mainInput);

// idea here is re-export bundled node modules
// to be imported in other packages, only entry is not external
const handleExternalsInMain = ({ request }, callback) => {
  if (request === mainEntry) {
    return callback();
  }
  callback(null, "commonjs2 " + request);
};

const configs = [
  createConfig({
    input: mainInput,
    output: "index.js",
    isNode: true,
    packageName,
    externals: handleExternalsInMain
  }),
  createConfig({
    input: "app.node.tsx",
    output: "app.node.js",
    isNode: true,
    packageName
  }),
  createConfig({
    input: "app.browser.tsx",
    output: "app.browser.js",
    isNode: false,
    packageName
  })
];

module.exports = configs;
