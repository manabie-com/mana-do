import { debounce } from '..'

jest.useFakeTimers()

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
  })
  it('should work properly', () => {
    const callback = jest.fn()
    const debounced = debounce(callback, 500)
    debounced()
    expect(callback).not.toBeCalled()

    jest.advanceTimersByTime(100)
    debounced()
    expect(callback).not.toBeCalled()

    jest.advanceTimersByTime(499)
    expect(callback).not.toBeCalled()

    jest.advanceTimersByTime(1)
    expect(callback).toBeCalledTimes(1)
  })
})
