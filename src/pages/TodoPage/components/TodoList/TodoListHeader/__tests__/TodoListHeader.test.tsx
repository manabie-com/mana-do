jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock('../../../../../../store/actions', () => ({ updateAllTodosStatus: jest.fn(), deleteAllTodos: jest.fn() }));

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { useSelector, useDispatch } from 'react-redux';

import { TodoListHeader } from '../TodoListHeader';
import { Store } from '../../../../../../store/reducers/root.reducer';
import { Todo, TodoStatus } from '../../../../../../models';
import { updateAllTodosStatus, deleteAllTodos } from '../../../../../../store/actions';

describe('TodoListHeader', () => {
  const completedTodos = [{ status: 'COMPLETED' } as Todo, { status: 'COMPLETED' } as Todo];

  const incompletedTodos = [{ status: 'COMPLETED' } as Todo, { status: 'ACTIVE' } as Todo];

  const defaultStore: Store = {
    todos: { items: incompletedTodos },
  };

  const mockDispatch = jest.fn();

  const updateAllTodosStatusAction = {
    type: 'updateAllTodosStatus',
  };

  const deleteAllTodosAction = {
    type: 'deleteAllTodos',
  };

  beforeAll(() => {
    (useSelector as jest.Mock).mockImplementation((selector) => selector(defaultStore));
    (useDispatch as jest.Mock).mockImplementation(() => mockDispatch);

    (updateAllTodosStatus as jest.Mock).mockReturnValue(updateAllTodosStatusAction);
    (deleteAllTodos as jest.Mock).mockReturnValue(deleteAllTodosAction);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component', () => {
    const wrapper = shallow(<TodoListHeader />);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should activate the switch when all todos is completed', () => {
    const mockStore: Store = {
      todos: { items: completedTodos },
    };
    (useSelector as jest.Mock).mockImplementation((selector) => selector(mockStore));

    const wrapper = shallow(<TodoListHeader />);

    expect(wrapper.find('Switch').prop('value')).toBe(true);
  });

  it('should deactivate the switch when any of the todos is not completed', () => {
    (useSelector as jest.Mock).mockImplementation((selector) => selector(defaultStore));

    const wrapper = shallow(<TodoListHeader />);

    expect(wrapper.find('Switch').prop('value')).toBe(false);
  });

  it('should mark all todos as active when the switch is clicked at completed state', () => {
    const mockStore: Store = {
      todos: { items: completedTodos },
    };
    (useSelector as jest.Mock).mockImplementation((selector) => selector(mockStore));

    const mockDispatch = useDispatch();

    const wrapper = shallow(<TodoListHeader />);

    wrapper.find('Switch').simulate('change', false);

    expect(updateAllTodosStatus).toBeCalledWith('ACTIVE');
    expect(mockDispatch).toBeCalledWith(updateAllTodosStatusAction);
  });

  it('should mark all todos as completed when the switch is clicked at active state', () => {
    const mockStore: Store = {
      todos: { items: completedTodos },
    };
    (useSelector as jest.Mock).mockImplementation((selector) => selector(mockStore));

    const mockDispatch = useDispatch();

    const wrapper = shallow(<TodoListHeader />);

    wrapper.find('Switch').simulate('change', true);

    expect(updateAllTodosStatus).toBeCalledWith('COMPLETED');
    expect(mockDispatch).toBeCalledWith(updateAllTodosStatusAction);
  });

  it('should delete all todos when delete button is clicked', () => {
    const wrapper = shallow(<TodoListHeader />);

    wrapper.find('.todo-card__delete-icon').simulate('click');

    expect(deleteAllTodos).toBeCalled();
    expect(mockDispatch).toBeCalledWith(deleteAllTodosAction);
  });
});
