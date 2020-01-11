import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App";

import { key } from "@foo/foo-app/src/lib/bar";

export const renderToString = (url: string) => {
  console.log({ url, key });
  return ReactDOMServer.renderToString(<App />);
};
