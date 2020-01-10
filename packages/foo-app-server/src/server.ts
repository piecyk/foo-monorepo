import * as fooApp from "@foo/foo-app";
import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!" + fooApp.renderFoo("ss")));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
