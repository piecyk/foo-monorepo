import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App";

export const renderToString = (url: string) => {
  console.log({ url });
  return ReactDOMServer.renderToString(<App />);
};
