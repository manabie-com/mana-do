import React from "react";
import App from "./App";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("App Test Suite", () => {
    it("renders without crashing", () => {
        shallow(<App />);
    });
});
