"use strict";
// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\haojie\dev\lse/dts/HelperLib-master/src/index.d.ts"/>
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
let apiKey = "";
const server = http.createServer((req, res) => {
    if (req.method === "POST" &&
        req.headers["content-type"] === "application/json" &&
        req.url === "/command") {
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
            const ok = mc.runcmd(data.command);
            if (ok) {
                res.statusCode = 204;
                res.end();
            }
            else {
                res.statusCode = 500;
                res.end("command failed");
            }
        });
    }
    else {
        res.statusCode = 404;
        res.end("not found");
    }
});
ll.registerPlugin("CommBridge", "Communicate with external systems through HTTP", [0, 0, 1], {});
try {
    const defaultConfig = {
        port: 8080,
        key: Math.random().toString(16).substring(2, 12),
    };
    const cfg = new JsonConfigFile("./plugins/CommBridge/config.json", JSON.stringify(defaultConfig));
    const port = Number(cfg.get("port"));
    apiKey = cfg.get("key");
    server.listen(port, () => {
        logger.info(`CommBridge server is listening on ${port} apiKey: ${apiKey}`);
    });
}
catch (error) {
    logger.error(error);
}
