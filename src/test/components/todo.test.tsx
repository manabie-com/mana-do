import React from 'react';
import { render } from '@testing-library/react';
import Todo from 'root/components/todo/presentation';

import { createLocation, createBrowserHistory } from 'history';
import { match } from 'react-router';
import userEvent from '@testing-library/user-event';

const renderTodo = (props: any) => {
  return render(
    <Todo
      inputRef={null}
      onCreateTodo={jest.fn()}
      showTodos={[]}
      onUpdateTodoStatus={Function}
      deleteTodo={Function}
      todos={{}}
      activeTodos={Number}
      onToggleAllTodo={jest.fn()}
      handleShowingAll={jest.fn()}
      handleShowingActive={jest.fn()}
      handleShowingCompleted={jest.fn()}
      onDeleteAllTodo={jest.fn()}
      onUpdateTodoContent={jest.fn()}
      showing={'ALL'}
      {...props}
    />
  )
}

describe('<Todo />', () => {
  test('Todo should rendered successful!', async () => {
    const component = renderTodo({})
    const todoWrapper = await component.findByTestId('todo-wrapper')
    expect(todoWrapper).toBeInTheDocument();
  })

  test('onCreateTodo should be called', async () => {
    const onCreateTodo = jest.fn()
    const component = renderTodo({ onCreateTodo })
    const todoInput = await component.findByTestId('todo-input')
    userEvent.type(todoInput, '12345678')
    expect(todoInput).toHaveValue('12345678')
    userEvent.keyboard('{Enter}')
    expect(onCreateTodo).toBeCalledTimes(9);
  })

  test('onToggleAllTodo should be called once', async () => {
    const onToggleAllTodo = jest.fn()
    const component = renderTodo({
      onToggleAllTodo,
      todos: [{}]
    })
    const toggleAllTodo = await component.findByTestId('checkbox-toggle-all-todo')
    userEvent.click(toggleAllTodo)
    expect(onToggleAllTodo).toBeCalledTimes(1);
  })

  test('handleShowingAll should be called once', async () => {
    const handleShowingAll = jest.fn()
    const component = renderTodo({
      handleShowingAll,
    })
    const btnShowingAll = await component.findByTestId('btn-showing-all')
    userEvent.click(btnShowingAll)
    expect(handleShowingAll).toBeCalledTimes(1);
  })

  test('handleShowingActive should be called once', async () => {
    const handleShowingActive = jest.fn()
    const component = renderTodo({
      handleShowingActive,
    })
    const btnShowingActive = await component.findByTestId('btn-showing-active')
    userEvent.click(btnShowingActive)
    expect(handleShowingActive).toBeCalledTimes(1);
  })

  test('handleShowingCompleted should be called once', async () => {
    const handleShowingCompleted = jest.fn()
    const component = renderTodo({
      handleShowingCompleted,
    })
    const btnShowingCompleted = await component.findByTestId('btn-showing-completed')
    userEvent.click(btnShowingCompleted)
    expect(handleShowingCompleted).toBeCalledTimes(1);
  })

  test('onDeleteAllTodo should be called once', async () => {
    const onDeleteAllTodo = jest.fn()
    const component = renderTodo({
      onDeleteAllTodo,
    })
    const btnDeleteAllTodo = await component.findByTestId('btn-delete-all-todo')
    userEvent.click(btnDeleteAllTodo)
    expect(onDeleteAllTodo).toBeCalledTimes(1);
  })
})
