import React from "react";
import ToDoCreate, { ToDoCreateProps } from "./todo-create.component";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const props: ToDoCreateProps = {
    onCreateTodo: jest.fn(),
};

describe("Todo Create Test Suite", () => {
    it("renders without crashing", () => {
        shallow(<ToDoCreate {...props} />);
    });

    it("onCreateTodo must NOT be called when input is empty and enter is pressed", () => {
        const wrapper = shallow(<ToDoCreate {...props} />);

        wrapper
            .find(".Todo__input")
            .simulate("change", { target: { value: "" } });
        wrapper.find(".Todo__input").simulate("keydown", { key: "Enter" });
        expect(props.onCreateTodo).toHaveBeenCalledTimes(0);
    });

    it("onCreateTodo must be called when input is not empty and enter is pressed", () => {
        const wrapper = shallow(<ToDoCreate {...props} />);

        wrapper
            .find(".Todo__input")
            .simulate("change", { target: { value: "hello" } });
        wrapper.find(".Todo__input").simulate("keydown", { key: "Enter" });
        expect(props.onCreateTodo).toHaveBeenCalledTimes(1);
    });

    it("Input should be emptied after adding", () => {
        const wrapper = shallow(<ToDoCreate {...props} />);
        const inputVal = wrapper.find(".Todo__input").props().value;

        wrapper
            .find(".Todo__input")
            .simulate("change", { target: { value: "hello" } });
        wrapper.find(".Todo__input").simulate("keydown", { key: "Enter" });
        expect(inputVal).toBe("");
    });
});
