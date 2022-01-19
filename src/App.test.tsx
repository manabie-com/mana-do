import { mount } from "enzyme";
import App from "./App";

it("Renders the app and the heading", () => {
  const wrapper = mount(<App />);
  expect(wrapper.find("h1").text()).toBe("To Do List");
});
