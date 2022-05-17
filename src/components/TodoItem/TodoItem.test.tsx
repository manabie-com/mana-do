import { ShallowWrapper, shallow, configure } from 'enzyme';
import { TodoItem } from '.';
import { TodoStatus } from '../../models/todo';
import shortid from 'shortid';
import { ChangeEvent } from 'react';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe('TodoItem testing', () => {
  let wrapper: ShallowWrapper<any>;
  const id = shortid();
  const mockTodo = {
    content: 'Implementing unit tests',
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id,
    user_id: "firstUser",
  }
  const mockUpdate = jest.fn((e: ChangeEvent, todoId: string) => {});
  const mockDelete = jest.fn((todoId: string) => {});
  
  let checkbox;
  let deleteBtn;

  beforeEach(() => {
    wrapper = shallow(<TodoItem index={0} todo={mockTodo} handleDelete={mockDelete} handleUpdate={mockUpdate} />);
    checkbox = wrapper.find('input[type="checkbox"]');
    deleteBtn = wrapper.find('btn.Todo__delete');
  });

  test('complete the todo when check the checkbox', () => {
    const checkbox = wrapper.find("input[type='checkbox']");
    const changeEvent = { target: { value: true }};
    checkbox.simulate('change', changeEvent);
    expect(mockUpdate).toHaveBeenCalledWith(changeEvent, id);
  });

  test('reactivate the todo when check the checkbox', () => {
    const checkbox = wrapper.find("input[type='checkbox']");
    const changeEvent = { target: { value: false }};
    checkbox.simulate('change', changeEvent);
    expect(mockUpdate).toHaveBeenCalledWith(changeEvent, id);
  });

  test('emit a todo delete when check the checkbox', () => {
    const deleteBtn = wrapper.find("button.Todo__delete");
    deleteBtn.simulate('click');
    expect(mockDelete).toHaveBeenCalledWith(id);
  });
})