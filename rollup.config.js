// TODO

import path from "path";
import { config as appConfig } from "./packages/foo-app/rollup.config";
import { config as appServerConfig } from "./packages/foo-app-server/rollup.config";

const fromPackage = name => path.join(__dirname, "packages", name);

const appP = fromPackage("foo-app");
const appServerP = fromPackage("foo-app-server");

export default [...appConfig(appP), appServerConfig(appServerP)];
