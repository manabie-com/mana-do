import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middleware = [thunk];

const mockStore = configureStore(middleware);
const logout = () => ({ type: "LOGOUT" });

it("should dispatch logout actions", () => {
  const initialState = {};
  const store = mockStore(initialState);

  store.dispatch(logout());
  const actions = store.getActions();
  const expectedPayload = { type: "LOGOUT" };
  expect(actions).toEqual([expectedPayload]);
});
