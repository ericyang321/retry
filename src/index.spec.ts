import trytrytry, { Settings, Callee, Controller } from "./index"

describe("callback", () => {
  let mockFn: Callee
  const settings: Settings = {
    timeoutAfter: 10 * 1000,
    totalTries: 5,
    tickEvery: 200,
  }

  beforeEach(() => {
    jest.useFakeTimers()
    mockFn = jest.fn()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  it("calls passed callback function", () => {
    // When
    trytrytry(settings, mockFn)
    jest.runAllTimers()
    // Then
    expect(mockFn).toHaveBeenCalled()
  })

  it("calls passed callback function the correct number of times", () => {
    // When
    trytrytry(settings, mockFn)
    jest.runAllTimers()
    // Then
    expect(mockFn).toHaveBeenCalledTimes(settings.totalTries)
  })
})

describe("pausing functionality", () => {
  let mockFn: Callee
  const settings: Settings = {
    timeoutAfter: 10 * 1000,
    totalTries: 5,
    tickEvery: 200,
  }
})

describe("publicly returned controller", () => {
  let mockFn: Callee
  let controller: Controller
  const settings: Settings = {
    timeoutAfter: 10 * 1000,
    totalTries: 5,
    tickEvery: 200,
  }

  beforeEach(() => {
    mockFn = jest.fn()
    controller = trytrytry(settings, mockFn)
  })

  it("has abort function", () => {
    expect(controller.abort).toEqual(expect.any(Function))
  })

  it("has pause function", () => {
    expect(controller.pause).toEqual(expect.any(Function))
  })

  it("has resume function", () => {
    expect(controller.resume).toEqual(expect.any(Function))
  })

  it("has isPaused status indicator function", () => {
    expect(controller.isPaused).toEqual(expect.any(Function))
  })

  it("has isOngoing status indicator function", () => {
    expect(controller.isOngoing).toEqual(expect.any(Function))
  })
})
