const fs = require("fs");
const { fromPaths } = require("./createConfig");
const path = require("path");

let { packageName, output } = process.argv.slice(2).reduce((acc, v) => {
  const [key, value] = v.split("=");
  return { ...acc, [key.replace("--", "")]: value };
}, {});

const { distPath } = fromPaths({ packageName });

if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath);
}

const outPath = path.join(distPath, output);

fs.closeSync(fs.openSync(outPath, "a"));
