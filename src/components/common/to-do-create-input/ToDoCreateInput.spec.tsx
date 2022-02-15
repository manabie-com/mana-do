import ToDoCreateInput from './ToDoCreateInput';
import { mount, shallow } from 'enzyme';
import '../../../../setupTests';
import Service from '../../../service';

describe('ToDoCreateInput', () => {
  const mockProps = {
    dispatch: jest.fn()
}
  it('Should render ToDoCreateInput correctly', () => {
    const wrapper = shallow(<ToDoCreateInput {...mockProps}/>);
    const input = wrapper.find('input');
    expect(input.hasClass("to-do__input")).toBeTruthy();
    expect(input.props().placeholder).toBe('What need to be done?');
  });

  it('Should create new task when press enter', () => {
    const wrapper = mount(<ToDoCreateInput {...mockProps}/>);
    const createTodo = jest.spyOn(Service, 'createTodo').mockResolvedValue({});
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'new TASK'} });
    input.simulate('keydown', { key: 'Enter' });
    expect(createTodo).toBeCalledTimes(1);
  });
});

export {};