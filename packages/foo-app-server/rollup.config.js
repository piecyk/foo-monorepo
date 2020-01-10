import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export const config = path => ({
  input: path + "/src/server.ts",
  output: [
    {
      file: path + "/dist/index.js",
      format: "cjs"
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      extensions: [".js", ".ts"],
      exclude: /node_modules/,
      babelrc: false,
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              node: "current"
            }
          }
        ],
        "@babel/typescript"
      ],
      plugins: [
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread"
      ]
    })
  ],
  external: ["express", "path", "@foo/foo-app"],
  watch: {
    clearScreen: false
  }
});

export default config(__dirname);
