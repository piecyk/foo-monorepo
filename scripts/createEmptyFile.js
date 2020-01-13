const fs = require("fs");
const { fromPackages } = require("./createConfig");

let { folders, file } = process.argv.slice(2).reduce((acc, v) => {
  const [key, value] = v.split("=");
  const maybeArray = value.split(",");

  return {
    ...acc,
    [key.replace("--", "")]:
      maybeArray.length === 1 ? maybeArray[0] : maybeArray
  };
}, {});

const distPaths = folders.map(p => fromPackages(p, "dist"));

distPaths.forEach(distPath => {
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
  }
});

fs.closeSync(fs.openSync(fromPackages(file), "a"));
