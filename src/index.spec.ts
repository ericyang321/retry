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

  test("calls passed callback function", () => {
    // When
    trytrytry(settings, mockFn)
    jest.runAllTimers()
    // Then
    expect(mockFn).toHaveBeenCalled()
  })

  test("calls passed callback function the correct number of times", () => {
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

  beforeEach(() => {
    jest.useFakeTimers()
    mockFn = jest.fn()
  })

  test("stops callback execution", () => {
    // Given
    const controller = trytrytry(settings, mockFn)
    controller.pause()
    // When
    jest.advanceTimersByTime(settings.tickEvery * 3)
    // Then
    expect(mockFn).toHaveBeenCalledTimes(0)
  })

  test("when paused, return status of true for isPaused", () => {
    // Given
    const controller = trytrytry(settings, mockFn)
    controller.pause()
    // Then
    expect(controller.isPaused()).toEqual(true)
  })

  test("when not paused, return status of false for isPaused", () => {
    // Given
    const controller = trytrytry(settings, mockFn)
    // When
    jest.runAllTimers()
    // Then
    expect(controller.isPaused()).toEqual(false)
  })
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

  test("has abort function", () => {
    expect(controller.abort).toEqual(expect.any(Function))
  })

  test("has pause function", () => {
    expect(controller.pause).toEqual(expect.any(Function))
  })

  test("has resume function", () => {
    expect(controller.resume).toEqual(expect.any(Function))
  })

  test("has isPaused status indicator function", () => {
    expect(controller.isPaused).toEqual(expect.any(Function))
  })

  test("has isOngoing status indicator function", () => {
    expect(controller.isOngoing).toEqual(expect.any(Function))
  })
})
