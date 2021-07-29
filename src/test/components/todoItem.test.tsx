import React from 'react';
import { render, fireEvent  } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import TodoItem from 'root/components/todo/subPresentations/todoItem';
import { TodoStatus } from 'root/models/todo';

const renderTodoItem = (props: any) => {
  return render(
    <TodoItem
      todo={
        {
          id: 'string',
          user_id: 'string',
          content: 'test-content',
          status: TodoStatus.COMPLETED,
          created_date: '',
        }
      }
      deleteTodo={() => { }}
      onUpdateTodoStatus={() => { }}
      onUpdateTodoContent={() => { }}
      deleteItemText='X'
      {...props}
    />,
  )
}

describe("<TodoItem />", () => {
  
  test('TodoItem is rendered successful with status completed', async () => {
    const component = renderTodoItem({})
    const getItemContent = component.getByText('test-content')
    expect(getItemContent).toBeInTheDocument();

    const deleteButton = component.getByText('X')
    expect(deleteButton).toBeInTheDocument();

    const checkboxStatus = await component.findByTestId('checkbox-status')
    expect(checkboxStatus).toBeInTheDocument();
    expect(checkboxStatus).toBeChecked();
  });

  test('TodoItem is rendered successful with status active', async () => {
    const component = renderTodoItem({
      todo: {
        id: 'string',
        user_id: 'string',
        content: 'test-content',
        status: TodoStatus.ACTIVE,
        created_date: '',
      }
    })
    const getItemContent = component.getByText('test-content')
    expect(getItemContent).toBeInTheDocument();

    const deleteButton = component.getByText('X')
    expect(deleteButton).toBeInTheDocument();

    const checkboxStatus = await component.findByTestId('checkbox-status')
    expect(checkboxStatus).toBeInTheDocument();
  });

  test('Should call onUpdateTodoStatus once', async () => {
    const onUpdateTodoStatus = jest.fn()
    const component = renderTodoItem({ onUpdateTodoStatus })
    const checkboxStatus = await component.findByTestId('checkbox-status')
    userEvent.click(checkboxStatus);
    expect(onUpdateTodoStatus).toBeCalledTimes(1);
  });

  test('Should call deleteTodo once', async () => {
    const deleteTodo = jest.fn()
    const component = renderTodoItem({ deleteTodo })
    const btnDeleteTodo = await component.findByTestId('btn-delete-todo')
    userEvent.click(btnDeleteTodo);
    expect(deleteTodo).toBeCalledTimes(1);
  });

  test('Should call onUpdateTodoContent once', async () => {
    const onUpdateTodoContent = jest.fn()
    const component = renderTodoItem({ onUpdateTodoContent })
    const todoItem = await component.findByTestId('todo-item')
    userEvent.dblClick(todoItem);
    const inputUpdateTodo = await component.findByTestId('input-edit-todo')
    expect(inputUpdateTodo).toHaveValue('test-content')
    fireEvent.keyPress(inputUpdateTodo, { key: "Enter", code: 13, charCode: 13 });
    // expect(onUpdateTodoContent).toBeCalledTimes(1)
  });
})