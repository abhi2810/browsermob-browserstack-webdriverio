const assert = require("assert");
const BrowserMob = require("browsermob-proxy-client");

describe("Wikipedia App", () => {
  it("Should load main page", async () => {
    driver.pause(15000);
    var bmpClient = BrowserMob.createClient();
    bmpClient
      .callRest(`proxy/${process.env.PROXY_PORT}/har`, "GET")
      .then((data) => {
        var harJSON = JSON.stringify(data);
        console.log("here");
        assert(harJSON.log.entries.length > 0);
      });
  });
});
