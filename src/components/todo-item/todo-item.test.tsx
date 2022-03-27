import React from "react";
import ToDoItem, { ToDoListProps } from "./todo-item.component";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { TodoStatus } from "../../models/todo";

configure({ adapter: new Adapter() });

const props: ToDoListProps = {
    todo: {
        content: "this is new content",
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: "23TplP",
        user_id: "firstUser",
        show: true,
    },
    idx: 0,
    onUpdateTodoStatus: jest.fn(),
    onDeleteTodo: jest.fn(),
    onUpdateTodo: jest.fn(),
};

describe("Todo Create Test Suite", () => {
    it("renders without crashing", () => {
        shallow(<ToDoItem {...props} />);
    });

    it("should show if todo.show is set to true", () => {
        const wrapper = shallow(<ToDoItem {...props} />);
        expect(wrapper.find(".ToDo__item").exists()).toBeTruthy();
    });

    it("should NOT show if todo.show is set to true", () => {
        props.todo.show = false;
        const wrapper = shallow(<ToDoItem {...props} />);

        expect(wrapper.find(".ToDo__item").exists()).toBeFalsy();
    });

    it("Delete should be called on delete click", () => {
        props.todo.show = true;
        const wrapper = shallow(<ToDoItem {...props} />);
        wrapper.find(".Todo__delete").simulate("click");
        expect(props.onDeleteTodo).toBeCalledWith(props.todo.id);
    });

    it("Update Status should be called on checkbox toggle", () => {
        props.todo.show = true;
        const wrapper = shallow(<ToDoItem {...props} />);
        wrapper
            .find(".ToDo__checkbox")
            .simulate("change", { target: { checked: true } });
        expect(props.onUpdateTodoStatus).toBeCalledWith(props.todo.id, true);
    });

    // it("Update should be called on edit enter", () => {
    //     props.todo.show = true;
    //     const wrapper = shallow(<ToDoItem {...props} />);
    //     wrapper.find(".ToDo__edit").simulate("keydown", { key: "Enter" });
    //     expect(props.onUpdateTodoStatus).toBeCalledWith(props.todo.id, true);
    // });
});
