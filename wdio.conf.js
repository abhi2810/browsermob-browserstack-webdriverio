const BrowserMob = require("browsermob-proxy-client");
const fs = require("fs");

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  specs: ["./test/specs/**/*.js"],
  maxInstances: 10,
  capabilities: [
    {
      "bstack:options": {
        buildName: "browsermob-browserstack-webdriverio",
        deviceName: "Samsung Galaxy S21",
        platformVersion: "11.0",
        platformName: "android",
        local: true,
        localIdentifier: "RandomString",
        debug: true,
        acceptInsecureCerts: true,
        networkLogs: true,
      },
    },
  ],
  logLevel: "info",
  bail: 0,
  baseUrl: "",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [
    [
      "browserstack",
      {
        app: "./WikipediaSample.apk",
        browserstackLocal: true,
        opts: {
          forceLocal: "true",
          localProxyHost: "localhost",
          localProxyPort: 8081,
          forceProxy: true,
          force: true,
          localIdentifier: "RandomString",
        },
      },
    ],
  ],
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
  onPrepare: async function (config, capabilities) {
    var bmpClient = BrowserMob.createClient();
    var proxyInfo = await bmpClient.start();
    console.log(proxyInfo);
    await bmpClient.createHar({
      captureHeaders: true,
      captureContent: true,
      captureBinaryContent: false,
      initialPageRef: true,
      initialPageTitle: true,
    });
    process.env["PROXY_PORT"] = proxyInfo.port;
  },
  after: async function (result, capabilities, specs) {
    var bmpClient = BrowserMob.createClient();
    bmpClient
      .callRest(`proxy/${process.env.PROXY_PORT}/har`, "GET")
      .then((data) => {
        var harJSON = JSON.stringify(data);
        console.log(harJSON);
        fs.writeFileSync("request.har", harJSON);
        assert(harJSON.log.entries.length > 0);
      });
    await bmpClient.closeProxies();
    await bmpClient.end();
  },
};
