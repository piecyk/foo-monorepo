import path from "path";
import { appServer } from "@foo/foo-app";
import express from "express";

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

const app = express();
const port = 3000;

const appDir = path.dirname(require.resolve("@foo/foo-app/package.json"));
const distDir = path.resolve(appDir, "dist");

app.use(express.static(distDir));

app.get("*", (req, res) => {
  res.status(200).send(
    `<!doctype html>
<html lang="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charset="utf-8" />
    <title>Welcome to APP</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <div id="root">${appServer.renderToString(req.url)}</div>
  <script src="app-browser.js"></script>
</body>
</html>`
  );
});

app.listen(port, () => console.log(`App started http://127.0.0.1:${port}`));
