import ToDoPage from './ToDoPage';
import { shallow } from 'enzyme';
import '../../../../setupTests';

describe('ToDoPage', () => {
  it('Should render todo page correctly', () => {
    const wrapper = shallow(<ToDoPage />);
    expect(wrapper.find('ToDoCreateInput').length).toBe(1);
    expect(wrapper.find('ToolBar').length).toBe(1);
    expect(wrapper.find('ToDoList').length).toBe(1);
  });
});

export {};