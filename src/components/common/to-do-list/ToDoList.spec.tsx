import ToDoList from './ToDoList';
import '../../../../setupTests';
import { shallow } from 'enzyme';
import { mockTodoList } from '../../../mock/todo';
import { TodoStatus } from '../../../models/todo';

describe('ToDoList', () => {
  const defaultProps = {
    todos: mockTodoList, 
    showing: 'ALL',
    dispatch: jest.fn()
  }

  it('Should render correctly', () => {
    const wrapper = shallow(<ToDoList {...defaultProps}/>);
    expect(wrapper.find('ToDoItem').length).toBe(2);
  });

  it('Should render list active to do correctly', () => {
    const mockProps = {...defaultProps, showing: TodoStatus.ACTIVE};
    const wrapper = shallow(<ToDoList {...mockProps}/>);
    expect(wrapper.find('ToDoItem').length).toBe(1);
  });

  it('Should render blank img when to do list is empty', () => {
    const mockProps = {...defaultProps, todos: []};
    const wrapper = shallow(<ToDoList {...mockProps}/>);
    const blankStateImg = wrapper.find('img');
    expect(blankStateImg.length).toBe(1);
    expect(blankStateImg.hasClass('to-do__blank-img')).toBeTruthy();
    expect(blankStateImg.props().alt).toBe('no items found!');
  });
});

export {};