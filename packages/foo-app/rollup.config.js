import replace from "@rollup/plugin-replace";
import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const isProd = process.env.NODE_ENV === "production";
const extensions = [".js", ".jsx", ".ts", ".tsx"];

export const buildConfig = ({ input, output, external, isNode }) => {
  return path => ({
    input: `${path}/src/${input}`,
    output: [
      {
        file: `${path}/dist/${output}`,
        format: isNode ? "cjs" : "iife"
      }
    ],
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify(
          isProd ? "production" : "development"
        )
      }),
      resolve({
        extensions
      }),
      commonjs(),
      babel({
        extensions,
        exclude: /node_modules/,
        babelrc: false,
        presets: [
          [
            "@babel/preset-env",
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
          "@babel/preset-react",
          "@babel/typescript"
        ],
        plugins: [
          "@babel/proposal-class-properties",
          "@babel/proposal-object-rest-spread"
        ]
      })
    ],
    external,
    watch: {
      clearScreen: false
    }
  });
};

export const config = p =>
  [
    buildConfig({
      input: "app-server.tsx",
      output: "app-server.js",
      external: ["react", "react-dom", "react-dom/server"],
      isNode: true
    }),
    buildConfig({
      input: "app-browser.tsx",
      output: "app-browser.js",
      isNode: false
    }),
    buildConfig({
      input: "index.ts",
      output: "index.js",
      external: () => true,
      isNode: true
    })
  ].map(f => f(p));

export default config(__dirname);
