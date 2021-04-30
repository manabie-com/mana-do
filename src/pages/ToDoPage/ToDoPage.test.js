import React from 'react';
import { mount } from 'enzyme';
import { TodoStatus } from '../../models/todo';


import ToDoPage from './ToDoPage';

const fakeLocalStorage = (function () {
  let store = {};

  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] =  JSON.stringify(value);
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    }
  };
})();

describe('render ToDoPage', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage,
    });
  });

  let Component;

  const mockProps = {
    todos: [{}, {}, {}],
  }

  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    window.localStorage.setItem('todos', mockProps.todos);
    Component = mount(<ToDoPage {...mockProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    expect(Component.length).toBe(1);
  });
  it('match snapshot', () => {
    expect(Component).toMatchSnapshot();
  });

  it('should render todo list', () => {
    expect(Component.find('div.ToDo__item')).toHaveLength(3);
  });

  describe('click tab action', () => {
    it('should call setState and change status is ALL', () => {
      const AllBtn = Component.find(
        'button[data-testid="btn-all"]',
      );
      AllBtn.simulate('click');

      expect(setState).toHaveBeenCalledWith(TodoStatus.ALL);
    });

    it('should call setState and change status is ACTIVE', () => {
      const ActiveBtn = Component.find(
        'button[data-testid="btn-active"]',
      );
      ActiveBtn.simulate('click');

      expect(setState).toHaveBeenCalledWith(TodoStatus.ACTIVE);
    });

    it('should call setState and change status is COMPLETED', () => {
      const CompletedBtn = Component.find(
        'button[data-testid="btn-completed"]',
      );
      CompletedBtn.simulate('click');

      expect(setState).toHaveBeenCalledWith(TodoStatus.COMPLETED);
    });
  })
});
