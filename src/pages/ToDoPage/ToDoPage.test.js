import React from 'react';
import { mount } from 'enzyme';
import ToDoPage from './ToDoPage';
import { TodoStatus } from '../../models/todo';

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

  it('should have todos data', () => {
    window.localStorage.setItem('todos', mockProps.todos);
    expect(window.localStorage.getItem('todos')).toEqual(JSON.stringify(mockProps.todos));
  });

  describe('click tab action', () => {
    it('should call setState and change status is ALL', () => {
      Component.setProps({ todos: mockProps.todos });
      window.localStorage.setItem('todos', mockProps.todos);
      const AllBtn = Component.find(
        'button[data-testid="btn-all"]',
      );
      AllBtn.simulate('click');

      expect(setState).toHaveBeenCalledWith(TodoStatus.ALL);
    });

    it('should call setState and change status is ACTIVE', () => {
      window.localStorage.setItem('todos', mockProps.todos);
      const ActiveBtn = Component.find(
        'button[data-testid="btn-active"]',
      );
      ActiveBtn.simulate('click');

      expect(setState).toHaveBeenCalledWith(TodoStatus.ACTIVE);
    });

    it('should call setState and change status is COMPLETED', () => {
      window.localStorage.setItem('todos', mockProps.todos);
      const CompletedBtn = Component.find(
        'button[data-testid="btn-completed"]',
      );
      CompletedBtn.simulate('click');

      expect(setState).toHaveBeenCalledWith(TodoStatus.COMPLETED);
    });
  })
});
