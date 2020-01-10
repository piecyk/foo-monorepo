// import { key } from "./lib/bar";
import { key} from "@foo/foo-app/src/lib/bar";

export const renderFoo = (f: string) => {
  console.log({ f, key });
  return "render from foo";
};
