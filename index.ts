// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\haojie\dev\lse/dts/HelperLib-master/src/index.d.ts"/>

import * as http from "http";
let apiKey = "";

const server = http.createServer((req, res) => {
  if (
    req.method === "POST" &&
    req.headers["content-type"] === "application/json" &&
    req.url === "/command"
  ) {
    if (req.headers["x-api-key"] !== apiKey) {
      res.statusCode = 403;
      res.end("forbidden");
      return;
    }
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const data = JSON.parse(body);
      logger.info(`received command: "${data.command}"`);
      //  执行命令
      const { success, output } = mc.runcmdEx(data.command);
      if (success) {
        res.statusCode = 200;
        res.end(output);
      } else {
        res.statusCode = 500;
        res.end(output || "command error");
      }
    });
  } else {
    res.statusCode = 404;
    res.end("not found");
  }
});

ll.registerPlugin(
  "CommBridge",
  "Communicate with external systems through HTTP",
  [0, 0, 2],
  {}
);

try {
  const defaultConfig = {
    port: 8080,
    key: Math.random().toString(16).substring(2, 12),
  };
  const cfg = new JsonConfigFile(
    "./plugins/CommBridge/config.json",
    JSON.stringify(defaultConfig)
  );
  const port = Number(cfg.get("port"));
  apiKey = cfg.get("key");
  server.listen(port, () => {
    logger.info(`CommBridge server is listening on ${port} apiKey: ${apiKey}`);
  });
} catch (error) {
  logger.error(error);
}
