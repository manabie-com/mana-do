import React from 'react';
import {cleanup, render, screen, fireEvent} from '@testing-library/react';
import ToDoList from '../';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('Todo list render correct content', () => {
  const onSelectEditTodo = (todo: any) => {
    expect(todos.findIndex(item => item.id === todo.id) !== -1).toBeTruthy()
  }
  const todos = [{content: 'Todo Test', id: '1', user_id: '1', created_date: new Date()},
    {content: 'Todo Test 2', id: '2', user_id: '2', created_date: new Date()}]

  render(<ToDoList todos={todos} onSelectEditTodo={onSelectEditTodo}/>);

  const todoElement = screen.getAllByTestId('todo-content')
  expect(todoElement.length === 2);

  for (let i = 0; i < todoElement.length; i++) {
    fireEvent.doubleClick(todoElement[i])
  }
});
