import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import App from "./App";

describe("App", function () {
  test("should render correct", async function () {
    let instance;
    await act(async () => {
      instance = mount(<App />);
    });

    expect(instance.find(".Action__btn")).toHaveLength(4);
    expect(instance.find("input")).toHaveLength(1);
  });
});
