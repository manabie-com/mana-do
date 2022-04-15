import React from 'react';
import reducer, { initialState } from './reducer';
import jobs from './jobs';
import { AppActions } from '../types/actions';

const middleware = (action: any, dispatch: React.Dispatch<AppActions>) => {
  console.log('LOG: ', action);

  jobs[action.type](action, dispatch);
};

function createStore() {
  return (selector?: Function) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const dispatchWithMiddleware = (action: AppActions): void => {
      middleware(action, dispatch);
      dispatch(action);
    };

    const selectedState =
      typeof selector === 'function' ? selector(state) : state;
    return [selectedState, dispatchWithMiddleware];
  };
}

export default createStore();
