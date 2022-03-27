import React from "react";
import TodoPage from "./todo-page.component";
import ToDoCreate from "../todo-create/todo-create.component";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Todo Page Test Suite", () => {
    it("renders without crashing", () => {
        shallow(<TodoPage />);
    });
});
