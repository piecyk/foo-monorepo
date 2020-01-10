// TODO

import { config as appConfig } from "./packages/foo-app/rollup.config";
import { config as appServerConfig } from "./packages/foo-app-server/rollup.config";

const appP = __dirname + "/packages/foo-app";

const appServerP = __dirname + "/packages/foo-app-server";

export default [...appConfig(appP), appServerConfig(appServerP)];
