import trytrytry from "./index";

const defaultSettings = {
  waitFor: 200,
  maxTries: 3,
};

interface SyncTrier {
  pause(): void;
  resume(): void;
  isPaused(): boolean;
}

describe("SyncTrier", () => {
  let trier: SyncTrier;

  describe("repeated calling mechanism", () => {
    let mockFn: Function;

    beforeAll(() => {
      jest.useFakeTimers();
    });

    beforeEach(() => {
      mockFn = jest.fn();
      trier = trytrytry(defaultSettings, mockFn);
    });

    it("calls callee by call count times", () => {
      // When
      jest.advanceTimersByTime(defaultSettings.maxTries * defaultSettings.waitFor);
      // Then
      expect(mockFn).toBeCalledTimes(defaultSettings.maxTries);
    });

    it("waits for waitFor duration between calls", () => {
      // When
      jest.advanceTimersByTime(defaultSettings.waitFor);
      // Then
      expect(mockFn).toBeCalledTimes(1);
    });

    it("does not call callee exceeding maxTries times", () => {
      // When
      jest.advanceTimersByTime(defaultSettings.waitFor * defaultSettings.maxTries + 1);
      // Then
      expect(mockFn).toBeCalledTimes(defaultSettings.maxTries);
    });
  });

  describe("on successful try detected", () => {
    let mockFn: Function;

    beforeAll(() => {
      jest.useFakeTimers();
    });

    beforeEach(() => {
      mockFn = jest.fn(() => true);
      trier = trytrytry(defaultSettings, mockFn);
    });

    it("stops execution when passed callee returns true", () => {
      // When
      jest.advanceTimersByTime(defaultSettings.waitFor);
      // Then
      expect(mockFn).toBeCalledTimes(1);
    });
  });

  describe("pausing", () => {
    let mockFn: Function;

    beforeAll(() => {
      jest.useFakeTimers();
    });

    beforeEach(() => {
      mockFn = jest.fn();
      trier = trytrytry(defaultSettings, mockFn);
    });

    it("#pause stops callee executions", () => {
      // When
      trier.pause();
      jest.advanceTimersByTime(defaultSettings.waitFor * defaultSettings.maxTries);
      // Then
      expect(mockFn).toBeCalledTimes(0);
    });

    it("#resume continues calls of a paused callee execution", () => {
      // When
      trier.pause();
      jest.advanceTimersByTime(defaultSettings.waitFor * 2);
      trier.resume();
      jest.advanceTimersByTime(defaultSettings.waitFor);
      // Then
      expect(mockFn).toBeCalledTimes(1);
    });

    it("#isPaused returns true when a timer is paused", () => {
      // When
      trier.pause();
      // Then
      expect(trier.isPaused()).toBe(true);
    });

    it("#isPaused returns false when timer is not paused", () => {
      expect(trier.isPaused()).toBe(false);
    });
  });
});
