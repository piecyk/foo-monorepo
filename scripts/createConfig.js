const path = require("path");

const pkgPath = require.resolve("../package.json");
const appDirectory = path.dirname(pkgPath);

const fromRoot = (...p) => path.join(appDirectory, ...p);
const fromPackages = (...p) => fromRoot("packages", ...p);

const isDev = process.env.NODE_ENV !== "production";
const extensions = [".ts", ".tsx", ".js", "jsx", ".json"];

const babelOptions = ({ isNode }) => ({
  babelrc: false,
  presets: [
    [
      "@babel/env",
      {
        ...(isNode
          ? {
              targets: {
                node: "current"
              }
            }
          : {})
      }
    ],
    "@babel/react",
    "@babel/typescript"
  ],
  plugins: [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ]
});

const babelLoader = ({ isNode }) => ({
  test: /\.(ts|js)x?$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: babelOptions({ isNode })
});

const safeResolve = request => {
  try {
    return require.resolve(request);
  } catch (error) {
    return null;
  }
};

const fromPaths = ({ packageName }) => {
  const currentRootPath = fromPackages(packageName);
  const fromCurrentRoot = (...p) => path.resolve(currentRootPath, ...p);

  const srcPath = fromCurrentRoot("src");
  const distPath = fromCurrentRoot("dist");

  return { currentRootPath, fromCurrentRoot, srcPath, distPath };
};

const externalsBy = packagePath => ({ request }, callback) => {
  const resolvedPath = safeResolve(request);

  const maybeExt = path.extname(resolvedPath || "");
  const isJsOrJson = maybeExt === ".js" || maybeExt === ".json";

  const isFromThisPackage = resolvedPath
    ? resolvedPath.indexOf(packagePath + "/") !== -1
    : true;

  const isExternal = isFromThisPackage ? false : isJsOrJson;
  if (isExternal) {
    return callback(null, "commonjs2 " + request);
  }

  callback();
};

const stats = {
  assets: false,
  modules: false,
  builtAt: false,
  hash: false
};

const createConfig = ({ isNode, input, output, packageName, externals }) => {
  const { currentRootPath, distPath, srcPath } = fromPaths({
    packageName,
    input
  });

  return {
    name: `@${packageName}/${input}`,
    ...(isNode ? { externals: externals || externalsBy(currentRootPath) } : {}),
    stats,
    devtool: false,
    target: isNode ? "node" : "web",
    mode: isDev ? "development" : "production",
    entry: path.join(srcPath, input),
    output: {
      path: distPath,
      filename: output,
      ...(isNode ? { libraryTarget: "commonjs2" } : {}),
      publicPath: "/"
    },
    resolve: {
      extensions
    },
    module: {
      rules: [babelLoader({ isNode })]
    },
    plugins: []
  };
};

module.exports = {
  createConfig,
  fromPackages,
  fromRoot,
  fromPaths
};
