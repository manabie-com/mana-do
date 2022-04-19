import React, { FC, ReactElement } from "react";
import { configure, mount } from "enzyme";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import TodoPage from "./TodoPage";

configure({ adapter: new Adapter() });

describe("TodoPage", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(<TodoPage />);
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  it("Should renders TodoPage correctly", () => {
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
