const BrowserMob = require("browsermob-proxy-client");
const assert = require("assert");

describe("NYTimes App", () => {
  it("Should load main page", async () => {
    var bmpClient = BrowserMob.createClient();
    await bmpClient.start();
    await bmpClient.createHar({
      captureHeaders: true,
      captureContent: true,
      captureBinaryContent: false,
      initialPageRef: true,
      initialPageTitle: true,
    });

    driver.pause(15000);

    bmpClient.getHar().then((data) => {
      var harJSON = JSON.stringify(data);
      console.log(harJSON);
      assert(harJSON.log.entries.length > 0);
    });
    await bmpClient.closeProxies();
    await bmpClient.end();
  });
});
