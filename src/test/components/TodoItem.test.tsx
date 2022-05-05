import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {Todo, TodoStatus} from "../../models/todo";
import shortid from "shortid";
import {act} from "react-dom/test-utils";
import TodoItem from "../../components/TodoItem";


let container: HTMLDivElement | null = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // @ts-ignore
    unmountComponentAtNode(container);
    container?.remove();
    container = null;
});

const todo: Todo = {
    content: 'fake content 1',
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: shortid(),
    user_id: 'userId1'
};

it('should render todo item',() => {
    const onUpdateTodoStatus = jest.fn();
    const onUpdateTodoContent = jest.fn();
    const onDeleteTodo = jest.fn();
    act(() => {
        render(<TodoItem showing={true}
                         todo={todo}
                         onUpdateTodoStatus={onUpdateTodoStatus}
                         onUpdateTodoContent={onUpdateTodoContent}
                         onDeleteTodo={onDeleteTodo} />, container)
    });
    const checkbox = (container?.querySelector('input[type=checkbox]') as HTMLInputElement);
    const span = container?.querySelector('span');
    const deleteButton = container?.querySelector('button');

    expect(checkbox.checked)
        .toEqual(todo.status === TodoStatus.COMPLETED);
    expect(span?.textContent).toEqual(todo.content);

    act(() => {
        deleteButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(onDeleteTodo).toHaveBeenCalledTimes(1);

    act(() => {
        checkbox.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(onUpdateTodoStatus).toHaveBeenCalledTimes(1);
});
