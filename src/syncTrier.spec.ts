import SyncTrier, { Callee } from "./syncTrier";

const defaultSettings = {
  waitFor: 200,
  callCount: 3,
};

describe("SyncTrier", () => {
  describe("repeated calling mechanism", () => {
    let trier: SyncTrier;
    let mockFn: Callee;

    beforeAll(() => {
      jest.useFakeTimers();
    });

    beforeEach(() => {
      mockFn = jest.fn();
      trier = new SyncTrier(defaultSettings, mockFn);
    });

    it("calls callee by call count times", () => {
      // When
      jest.advanceTimersByTime(defaultSettings.callCount * defaultSettings.waitFor);
      // Then
      expect(mockFn).toBeCalledTimes(defaultSettings.callCount);
    });

    it("waits for waitFor duration between calls", () => {
      // When
      jest.advanceTimersByTime(defaultSettings.waitFor);
      // Then
      expect(mockFn).toBeCalledTimes(1);
    });

    it("does not call callee exceeding callCount times", () => {
      // When
      jest.advanceTimersByTime(defaultSettings.waitFor * defaultSettings.callCount + 1);
      // Then
      expect(mockFn).toBeCalledTimes(defaultSettings.callCount);
    });
  });

  describe("pausing", () => {
    let trier: SyncTrier;
    let mockFn: Callee;

    beforeAll(() => {
      jest.useFakeTimers();
    });

    beforeEach(() => {
      mockFn = jest.fn();
      trier = new SyncTrier(defaultSettings, mockFn);
    });

    it("pause stops callee executions", () => {
      // When
      trier.pause();
      jest.advanceTimersByTime(defaultSettings.waitFor * defaultSettings.callCount);
      // Then
      expect(mockFn).toBeCalledTimes(0);
    });

    it("resume continues calls of a paused callee execution", () => {
      // When
      trier.pause();
      jest.advanceTimersByTime(defaultSettings.waitFor * 2);
      trier.resume();
      jest.advanceTimersByTime(defaultSettings.waitFor);
      // Then
      expect(mockFn).toBeCalledTimes(1);
    });
  });
});
