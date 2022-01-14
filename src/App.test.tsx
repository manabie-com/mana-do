import React from 'react';
import { shallow, ShallowWrapper } from "enzyme";

import { findByTestAttr } from "test/testUtils";
import App from "App";

const setUp = (): ShallowWrapper => {
  const wrapper = shallow(<App />)
  return wrapper;
}

test("renders App without errors", () => {
  const wrapper: ShallowWrapper = setUp();
  const app = findByTestAttr(wrapper, "app");
  expect(app.length).toBe(1);
});