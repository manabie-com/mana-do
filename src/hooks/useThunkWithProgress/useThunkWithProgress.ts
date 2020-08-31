import React from 'react';
import { useDispatch } from 'react-redux';

interface AsyncDispatchOutcome {
  error: Error | null;
  loading: boolean;
}

export const useThunkWithProgress = (thunk) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const thunkWithProgress = React.useCallback(
    (dispatch) => {
      setIsLoading(true);

      const dispatchWrapper = (action) => {
        setIsLoading(false);

        dispatch(action);
      };

      thunk(dispatchWrapper);
    },
    [thunk],
  );

  return {
    isLoading,
    thunkWithProgress,
  };
};
