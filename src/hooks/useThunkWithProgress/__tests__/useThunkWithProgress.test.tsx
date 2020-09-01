import { renderHook, act } from '@testing-library/react-hooks';

import { useThunkWithProgress } from '../useThunkWithProgress';

jest.useFakeTimers();

describe('useThunkWithProgress', () => {
  const mockDispatch = jest.fn();

  const thunkCallTime = 1000;

  const mockThunk = jest.fn().mockImplementation(() => (dispatch) => {
    setTimeout(() => {
      dispatch();
    }, thunkCallTime);
  });

  it('should initially not loading', () => {
    const { result } = renderHook(() => useThunkWithProgress(mockThunk));

    expect(result.current.isLoading).toBe(false);
  });

  it('should start loading when the thunk is called', async () => {
    const { result } = renderHook(() => useThunkWithProgress(mockThunk));

    act(() => {
      result.current.thunkWithProgress()(mockDispatch);
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('should stop loading when the thunk complete dispatching', async () => {
    const { result } = renderHook(() => useThunkWithProgress(mockThunk));

    await act(async () => {
      await result.current.thunkWithProgress()(mockDispatch);
      jest.advanceTimersByTime(thunkCallTime);
    });

    expect(result.current.isLoading).toBe(false);
  });
});
