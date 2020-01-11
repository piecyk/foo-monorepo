import { createConfig } from "../../scripts/createConfig";

export const config = p =>
  [
    createConfig({
      input: "app.node.tsx",
      output: "app.node.js",
      external: ["react", "react-dom", "react-dom/server"],
      isNode: true
    }),
    createConfig({
      input: "app.browser.tsx",
      output: "app.browser.js",
      isNode: false
    }),
    createConfig({
      input: "index.ts",
      output: "index.js",
      external: () => true,
      isNode: true
    })
  ].map(f => f(p));

export default config(__dirname);
