const fs = require("fs");
const path = require("path");
const express = require("express");
const ssr = require("./ssr/mains.js");

const app = express();
const indexTemplateString = fs
  .readFileSync(path.resolve(__dirname, "./index.html"))
  .toString();
const headerHtmlPage = indexTemplateString.substr(
  0,
  indexTemplateString.indexOf("root") + 6
);
const endHtmlPage = indexTemplateString.substr(
  indexTemplateString.indexOf("root") + 6
);
/** SSR */
const ssrFunc = async (request, response) => {
  try {
    const stream = await ssr({
      request
    });
    const {
      initialServerData
    } = stream.partialRenderer.stack[0].children[0].props.context;
    stream.on("data", function handleData() {
      stream.off("data", handleData);
      response.writeHead(200, {
        "content-type": "text/html",
        "content-transfer-encoding": "chunked",
        "x-content-type-options": "nosniff"
      });
      response.write(headerHtmlPage);
      response.write(
        `<script>window.__initialServerData__=${JSON.stringify(
          initialServerData
        )}</script>`
      );
      response.flushHeaders();
    });
    await new Promise((resolve, reject) => {
      stream.on("error", err => {
        stream.unpipe(response);
        reject(err);
      });
      stream.on("end", () => {
        response.write(endHtmlPage);
        resolve();
      });
      stream.pipe(response);
    });
  } catch (err) {
    response.writeHead(500, {
      "content-type": "text/pain"
    });
    response.end(String((err && err.stack) || err));
    return;
  }
};

app.use(function(req, res, next) {
  res.set("Cache-Control", "public, max-age=31557600");
  next();
});
app.get("/", ssrFunc);

app.use(`/static/ssr`, express.static(path.resolve(__dirname, `./static`)));

const listener = app.listen(process.env.PORT || 2048, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
