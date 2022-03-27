import React from "react";
import TodoToolbar, { ToDoToolbarProps } from "./todo-toolbar.component";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { TodoStatus } from "../../models/todo";
configure({ adapter: new Adapter() });

const props: ToDoToolbarProps = {
    todos: [
        {
            content: "this is new content",
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: "23TplP",
            user_id: "firstUser",
            show: true,
        },
        {
            content: "this is another content",
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: "24TplP",
            user_id: "firstUser",
            show: true,
        },
    ],
    setShowing: jest.fn(),
    onToggleAllTodo: jest.fn(),
    onDeleteAllTodo: jest.fn(),
};

describe("Todo Toolbar Test Suite", () => {
    it("renders without crashing", () => {
        shallow(<TodoToolbar {...props} />);
    });

    it("renders buttons without crashing", () => {
        const wrapper = shallow(<TodoToolbar {...props} />);

        expect(wrapper.find(".Action__btn__secondary").length).toBeTruthy();
        expect(wrapper.find(".Action__btn__primary").length).toBeTruthy();
        expect(wrapper.find(".Action__btn__success").length).toBeTruthy();
        expect(wrapper.find(".Action__btn__danger").length).toBeTruthy();
    });

    it("Toggle All should be called on checkbox toggle", () => {
        const wrapper = shallow(<TodoToolbar {...props} />);
        wrapper
            .find(".ToDo__checkbox")
            .simulate("change", { target: { checked: true } });
        expect(props.onToggleAllTodo).toBeCalledWith(true);
    });

    it("Clear All should be called on clear button click", () => {
        const wrapper = shallow(<TodoToolbar {...props} />);
        wrapper.find(".Action__btn__danger").simulate("click");
        expect(props.onDeleteAllTodo).toHaveBeenCalled();
    });
});
