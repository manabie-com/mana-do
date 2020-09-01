import React from 'react';
import { Dispatch } from 'redux';

export const useThunkWithProgress = (thunk) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const thunkWithProgress = React.useCallback(
    (...args: any[]) => (dispatch: Dispatch) => {
      setIsLoading(true);

      const dispatchWrapper = (action) => {
        setIsLoading(false);

        dispatch(action);
      };

      thunk(...args)(dispatchWrapper);
    },
    [thunk],
  );

  return {
    isLoading,
    thunkWithProgress,
  };
};
