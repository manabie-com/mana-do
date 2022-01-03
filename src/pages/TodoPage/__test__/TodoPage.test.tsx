import React from 'react';
import ToDoPage from 'pages/TodoPage';
import {fireEvent, render, screen} from '@testing-library/react';
import {Todo} from 'models';

jest.mock('../../../service', () => {
  const {TodoStatus} = require('models');
  const todos: Todo[] = [
    {
      id: '231-s',
      content: 'some tasks1',
      status: TodoStatus.ACTIVE,
      user_id: 'user1',
      created_date: new Date().toISOString(),
    },
    {
      id: '231-d',
      content: 'some tasks2',
      status: TodoStatus.ACTIVE,
      user_id: 'user1',
      created_date: new Date().toISOString(),
    },
    {
      id: '231-f',
      content: 'some tasks3',
      status: TodoStatus.ACTIVE,
      user_id: 'user1',
      created_date: new Date().toISOString(),
    },
  ];
  return {
    getTodos: () => Promise.resolve(todos),
    createTodo : (content:string) => Promise.resolve({
        id: '231-f',
        content: content,
        status: TodoStatus.ACTIVE,
        user_id: 'user1',
        created_date: new Date().toISOString(),
      })
  };
});

describe('TodoPage component', () => {
  it('Should todo lenght is 3 when initialized', async () => {
    render(<ToDoPage />);
    const todoElements = await screen.findAllByTestId('todo-item');
    expect(todoElements.length).toBe(3);
  });
  describe('Add todo feature', () => {
    beforeEach(async () => {
      render(<ToDoPage />);
    });
    it('should not be add when input is empty', async () => {
      const inputElement = screen.getByPlaceholderText(/What need to be done/i);
      fireEvent.keyDown(inputElement, {key: 'Enter', code: 'Enter', charCode: 13});
      const todoElements = await screen.findAllByTestId('todo-item');
      expect(todoElements.length).toBe(3);
    });
    it('should be add when input is not empty', async () => {
        const inputElement:HTMLInputElement = screen.getByPlaceholderText(/What need to be done/i);
        fireEvent.change(inputElement,{target:{value : 'new todo'}})
        fireEvent.keyDown(inputElement, {key: 'Enter', code: 'Enter', charCode: 13});
        expect(await screen.findByText('new todo')).toBeInTheDocument()
        const todoElements = await screen.findAllByTestId('todo-item');
        expect(todoElements.length).toBe(4);
        const inputElementThen:HTMLInputElement = await screen.findByPlaceholderText(/What need to be done/i);
        expect(inputElementThen.value).toBe('')
      });
  });
});
