const fs = require("fs");
const { fromPackages } = require("./createConfig");

let { folders, files } = process.argv.slice(2).reduce((acc, v) => {
  const [key, value] = v.split("=");

  return {
    ...acc,
    [key.replace("--", "")]: value.split(",")
  };
}, {});

const distPaths = folders.map(p => fromPackages(p, "dist"));

distPaths.forEach(distPath => {
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
  }
});

files.forEach(file => {
  fs.closeSync(fs.openSync(fromPackages(file), "a"));
});
