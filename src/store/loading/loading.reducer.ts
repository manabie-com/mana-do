
// All loading state will handle at right

const loadingReducer = (state = {}, action: any) => {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);
  if (!matches) return state;  

  const [, requestName, requestState] = matches;
  return {
    ...state,
    // It will be true when receiving GET_TODOS_REQUEST
    // and false when receiving SOME_THING_SUCCESS / SOME_THING_FAILURE
    [requestName]: requestState === 'REQUEST',
  };
};

export default loadingReducer;