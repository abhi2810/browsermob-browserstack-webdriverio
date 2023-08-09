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
        app: "./nytimes.apk",
        browserstackLocal: true,
        opts: {
          forceLocal: "true",
          localProxyHost: "localhost",
          localProxyPort: 8081,
          forceProxy: true,
          force: true,
          localIdentifier: "RandomString",
          useCaCertificate:
            "/Users/abhi/Downloads/browsermob-proxy-2.1.4/ssl-support/ca-certificate-rsa.pem",
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
};
