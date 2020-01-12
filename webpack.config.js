// const path = require("path");
const { fromPackages } = require("./scripts/createConfig");

const appConfigArray = require("./packages/foo-app/webpack.config");
const serverAppConfigArray = require("./packages/foo-app-server/webpack.config");

// ForkTsCheckerWebpackPlugin doesn't support now project references
// https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/issues/187
// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

class ExtraWatchWebpackPlugin {
  apply(compiler) {
    compiler.hooks.afterCompile.tap("after-compile", compilation => {
      compilation.contextDependencies.add(fromPackages("foo-app/dist"));
    });
  }
}

const plugins = [
  // new ForkTsCheckerWebpackPlugin({
  //   tsconfig: fromRoot("tsconfig.json"),
  //   useTypescriptIncrementalApi: true
  // })
  new ExtraWatchWebpackPlugin()
];

serverAppConfigArray[0].plugins = [
  ...serverAppConfigArray[0].plugins,
  ...plugins
];

module.exports = [...appConfigArray, ...serverAppConfigArray];
