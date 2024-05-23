# CommBridge for Levilamina

Levilamina 的 LegacyScriptEngine插件, 用于在Levilamina与其他服务之间进行通信，连接多个系统。

## 安装

```shell
lip install --upgrade gitea.litebds.com/LiteLDev/legacy-script-engine-nodejs
lip install --upgrade github.com/haojie06/CommBridge
```

首次运行后，可以修改 plugins/CommBridge/config.json 文件，配置http请求的端口和key, 推荐对端口进行反代，尽量避免直接使用http请求避免暴露key。

## 功能

- 通过http请求执行命令

  ```http
  POST /command
  Host: localhost:8080
  X-API-Key: f01cc8a54c
  Content-Type: application/json

  {
      "command": "whitelist add xxx"
  }
  ```
  
- 等待更多的需求...
