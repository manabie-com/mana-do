import ToDoCreateInput from './ToDoCreateInput';
import { shallow } from 'enzyme';
import '../../../../setupTests';

describe('ToDoCreateInput', () => {
  it('Should render ToDoCreateInput correctly', () => {
    const mockProps = {
        dispatch: jest.fn()
    }
    const wrapper = shallow(<ToDoCreateInput {...mockProps}/>);
    const input = wrapper.find('input');
    expect(input.hasClass("to-do__input")).toBeTruthy();
    expect(input.props().placeholder).toBe('What need to be done?');
  });
});

export {};