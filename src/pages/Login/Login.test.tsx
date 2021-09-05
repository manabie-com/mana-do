import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middleware = [thunk];

const mockStore = configureStore(middleware);
const loginRequested = () => ({ type: "LOGIN_REQUESTED" });
const loginSuccess = () => ({ type: "LOGIN_SUCCESS" });
const loginFailed = () => ({ type: "LOGIN_FAILED" });
it("should dispatch login actions", () => {
  const initialState = {};
  const store = mockStore(initialState);

  store.dispatch(loginRequested());
  const actions = store.getActions();
  const expectedPayload = { type: "LOGIN_REQUESTED" };
  expect(actions).toEqual([expectedPayload]);
});

it("should dispatch login success actions", () => {
  const initialState = {};
  const store = mockStore(initialState);

  store.dispatch(loginSuccess());
  const actions = store.getActions();
  const expectedPayload = { type: "LOGIN_SUCCESS" };
  expect(actions).toEqual([expectedPayload]);
});

it("should dispatch login failed actions", () => {
  const initialState = {};
  const store = mockStore(initialState);

  store.dispatch(loginFailed());
  const actions = store.getActions();
  const expectedPayload = { type: "LOGIN_FAILED" };
  expect(actions).toEqual([expectedPayload]);
});
