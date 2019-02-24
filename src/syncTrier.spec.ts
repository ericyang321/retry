import SyncTrier, { Callee } from "./syncTrier";

const defaultSettings = {
  waitFor: 200,
  callCount: 3,
};

describe("SyncTrier", () => {
  let trier;
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
    jest.advanceTimersByTime(defaultSettings.waitFor * defaultSettings.callCount + 1)
    // Then
    expect(mockFn).toBeCalledTimes(defaultSettings.callCount)
  })
});
