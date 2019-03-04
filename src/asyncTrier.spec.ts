import trytrytry, { Trier } from "./index";
import { defaultSettings, Settings } from "./settings";

function createCounteredAsyncFailure(failureCount: number, timeout: number) {
  let counter = failureCount;
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (counter === 1) {
          return resolve();
        }
        reject();
        counter--;
      }, timeout);
    });
  };
}

function wait(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}
describe("AsyncTrier", () => {
  describe("repeated calling mechanism", () => {
    let mockFn: jest.Mock<{}>;
    let successFn: jest.Mock<{}>;
    let settings: Settings;
    let trier: Trier;
    const ticksTillSuccess = 3;

    // NOTE: you can't use jest.useFakeTimer and async await at the same time

    beforeEach(() => {
      mockFn = jest.fn().mockImplementation(createCounteredAsyncFailure(ticksTillSuccess, 0));
      successFn = jest.fn();
      settings = Object.assign({}, defaultSettings, { success: successFn, async: true });
      trier = trytrytry(settings, mockFn);
    });

    it("calls PromiseCallee until PromiseCallee returns ", async () => {
      // When
      await wait(defaultSettings.waitFor * ticksTillSuccess);
      // Then
      expect(successFn).toBeCalledTimes(1);
    });
  });
});
