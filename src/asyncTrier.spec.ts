import trytrytry, { Trier } from "./index";
import { defaultSettings, Settings } from "./settings";

function createCounteredAsyncFailure(failureCount: number) {
  let counter = failureCount;
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (counter === 1) {
          return resolve();
        }
        reject();
        counter--;
      }, 0);
    });
}

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createArtifacts(ticksTillSuccess: number) {
  const mockFn = jest.fn().mockImplementation(createCounteredAsyncFailure(ticksTillSuccess));
  const successFn = jest.fn();
  const settings = Object.assign({}, defaultSettings, { success: successFn, async: true });
  const trier = trytrytry(settings, mockFn);

  return { trier, successFn, mockFn };
}

describe("AsyncTrier", () => {
  describe("repeated calling mechanism", () => {
    // NOTE: you can't use jest.useFakeTimer and async await at the same time

    it("calls PromiseCallee until PromiseCallee returns ", async () => {
      // Given
      const ticksTillSuccess = 3;
      const { successFn } = createArtifacts(ticksTillSuccess);
      // When
      await wait(defaultSettings.waitFor * ticksTillSuccess);
      // Then
      expect(successFn).toBeCalledTimes(1);
    });

    it("stops calling PromiseCallee when promise is successful", async () => {
      // Given
      const ticksTillSuccess = 1;
      const { successFn } = createArtifacts(ticksTillSuccess);
      // When
      await wait(defaultSettings.waitFor * ticksTillSuccess);
      // Then
      expect(successFn).toBeCalledTimes(1);
    });
  });
});
