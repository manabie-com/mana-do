import React from "react";
import App from "./App";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("App testing", () => {
  it("render correct app header", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find({ className: "App" }).length).toBeTruthy();
  });
});
