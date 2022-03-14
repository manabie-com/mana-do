import React from 'react';
import {render as reactRender, fireEvent, screen} from '@testing-library/react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Service from '../service';

import { Todo, TodoStatus } from '../models/todo';
import ToDoPage from '../ToDoPage';

describe('ToDoPage', () => {
  let container: Element;
  const mockTodos: Array<Todo> = [
    {
      id: 'todo1',
      content: 'todo1',
      status: TodoStatus.ACTIVE,
    },
    {
      id: 'todo2',
      content: 'todo2',
      status: TodoStatus.ACTIVE,
    },
    {
      id: 'todo3',
      content: 'todo3',
      status: TodoStatus.COMPLETED,
    },
  ];

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  
  it('renders with todos content', async () => {
    jest.spyOn(Service, 'getTodos').mockResolvedValueOnce(mockTodos);
    await act(async () => {
      render(<ToDoPage />, container);
    });
    expect(
      [ ...container.querySelectorAll('.ToDo__item span') ]
        .map((node: Element) => node.textContent)
    ).toStrictEqual(mockTodos.map((todo) => todo.content));
  });

  it('renders with todos status', async () => {
    jest.spyOn(Service, 'getTodos').mockResolvedValueOnce(mockTodos);
    await act(async () => {
      render(<ToDoPage />, container);
    });
    expect(
      [ ...(container.querySelectorAll('.ToDo__item input') as unknown as HTMLInputElement[]) ]
        .map((node) => node.checked)
    ).toStrictEqual(mockTodos.map((todo) => (
      todo.status === TodoStatus.COMPLETED
    )));
  });

  it('renders with todos status', async () => {
    jest.spyOn(Service, 'getTodos').mockResolvedValueOnce(mockTodos);
    await act(async () => {
      render(<ToDoPage />, container);
    });
    expect(
      [ ...(container.querySelectorAll('.ToDo__item input') as unknown as HTMLInputElement[]) ]
        .map((node) => node.checked)
    ).toStrictEqual(mockTodos.map((todo) => (
      todo.status === TodoStatus.COMPLETED
    )));
  });

  it('status checkbox should work', async () => {
    jest.spyOn(Service, 'getTodos').mockResolvedValueOnce(mockTodos);
    jest.spyOn(Service, 'updateTodoStatus').mockImplementationOnce(jest.fn());
    await act(async () => {
      render(<ToDoPage />, container);
    });

    await act(async () => {
      (container.querySelector('.ToDo__item input') as HTMLInputElement)
        .click();
    });

    expect(Service.updateTodoStatus).toHaveBeenCalledWith(
      mockTodos[0].id,
      TodoStatus.COMPLETED,
    );
  });

  it('delete button should work', async () => {
    jest.spyOn(Service, 'getTodos').mockResolvedValueOnce(mockTodos);
    jest.spyOn(Service, 'deleteTodo').mockImplementationOnce(jest.fn());
    await act(async () => {
      render(<ToDoPage />, container);
    });

    await act(async () => {
      (container.querySelector('.Todo__delete') as HTMLInputElement)
        .click();
    });

    expect(Service.deleteTodo).toHaveBeenCalledWith(mockTodos[0].id,);
  });

  it('delete all button should work', async () => {
    jest.spyOn(Service, 'getTodos').mockResolvedValueOnce(mockTodos);
    jest.spyOn(Service, 'deleteAllTodos').mockImplementationOnce(jest.fn());
    await act(async () => {
      render(<ToDoPage />, container);
    });

    await act(async () => {
      (container.querySelector('.Todo__toolbar > .Action__btn') as HTMLButtonElement)
        .click();
    });

    expect(Service.deleteAllTodos).toHaveBeenCalled();
  });

  it('toggle status button should work', async () => {
    jest.spyOn(Service, 'getTodos').mockResolvedValueOnce(mockTodos);
    jest.spyOn(Service, 'updateManyTodoStatus').mockImplementationOnce(jest.fn());
    await act(async () => {
      render(<ToDoPage />, container);
    });

    await act(async () => {
      (container.querySelector('.Todo__toolbar > input') as HTMLInputElement)
        .click();
    });

    expect(Service.updateManyTodoStatus).toHaveBeenCalledWith(
      mockTodos.map((todo) => todo.id),
      TodoStatus.COMPLETED,
    );
  });

  it('filter all button should work', async () => {
    jest.spyOn(Service, 'getTodos').mockResolvedValueOnce(mockTodos);
    await act(async () => {
      render(<ToDoPage />, container);
    });

    jest.spyOn(Service, 'getTodos').mockImplementationOnce(jest.fn());
    await act(async () => {
      (container.querySelector('.Todo__tabs > button:nth-of-type(1)') as HTMLButtonElement)
        .click();
    });

    expect(Service.getTodos).toHaveBeenCalledWith('ALL');
  });

  it('filter active button should work', async () => {
    jest.spyOn(Service, 'getTodos').mockResolvedValueOnce(mockTodos);
    await act(async () => {
      render(<ToDoPage />, container);
    });

    jest.spyOn(Service, 'getTodos').mockImplementationOnce(jest.fn());
    await act(async () => {
      (container.querySelector('.Todo__tabs > button:nth-of-type(2)') as HTMLButtonElement)
        .click();
    });

    expect(Service.getTodos).toHaveBeenCalledWith(TodoStatus.ACTIVE);
  });

  it('filter completed button should work', async () => {
    jest.spyOn(Service, 'getTodos').mockResolvedValueOnce(mockTodos);
    await act(async () => {
      render(<ToDoPage />, container);
    });

    jest.spyOn(Service, 'getTodos').mockImplementationOnce(jest.fn());
    await act(async () => {
      (container.querySelector('.Todo__tabs > button:nth-of-type(3)') as HTMLButtonElement)
        .click();
    });

    expect(Service.getTodos).toHaveBeenCalledWith(TodoStatus.COMPLETED);
  });

  it('todo form should work', async () => {
    jest.spyOn(Service, 'getTodos').mockResolvedValueOnce(mockTodos);
    jest.spyOn(Service, 'createTodo').mockImplementationOnce(
      jest.fn(async (content: string) => mockTodos[2])
    );
    await act(async () => {
      reactRender(<ToDoPage />);
    })
    const input = screen.getByPlaceholderText('What need to be done?');
    await act(async () => {
      fireEvent.change(input, {target: {value: mockTodos[2].content}});
    })
    await act(async () => {
      fireEvent.keyDown(input, {key: 'Enter', code: 'Enter', charCode: 13});
    })
    expect(Service.createTodo).toHaveBeenCalledWith(mockTodos[2].content);
  });
})