import { createConfig } from "../../scripts/createConfig";

export const config = createConfig({
  input: "server.ts",
  output: "index.js",
  external: ["express", "path", "@foo/foo-app"],
  isNode: true
});

export default config(__dirname);
