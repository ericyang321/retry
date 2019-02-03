import trytrytry from "./index"

describe("callback", () => {
  let mockFn: () => any
  let settings = {
    exponentialBackoff: false,
    timeout: 10 * 1000,
    tries: 5,
    every: 200,
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
    expect(mockFn).toHaveBeenCalledTimes(settings.tries)
  })
})
