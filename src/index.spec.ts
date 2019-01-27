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

  it("calls the callback passed in", () => {
    // When
    trytrytry(settings, mockFn)
    jest.runAllTimers()
    // Then
    expect(mockFn).toHaveBeenCalledTimes(5)
  })
})
