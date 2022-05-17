import { render } from "@testing-library/react"
import { Filterer } from "."
import { EnhanceTodoStatus, TodoStatus } from '../../models/todo';
import { shallow, configure, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe('filterer test', () => {
  let setShowingMock = jest.fn((status: EnhanceTodoStatus) => {});
  let wrapper: ShallowWrapper<any>;
  beforeEach(() => {
    wrapper = shallow(<Filterer setShowing={setShowingMock}/>)
  })

  test('should render all 3 buttons when mounting', () => {
    const todoTabs = wrapper.find('div.Todo__tabs');
    expect(todoTabs.children().length).toEqual(3);
  });

  test('should show all when show-all button clicked', () => {
    const showAllButton = wrapper.find('button.Action__btn').at(0);
    showAllButton.simulate('click');
    expect(setShowingMock).toBeCalledWith('ALL');
  });
  test('should show all when show-all button clicked', () => {
    const showAllButton = wrapper.find('button.Action__btn').at(1);
    showAllButton.simulate('click');
    expect(setShowingMock).toBeCalledWith(TodoStatus.ACTIVE);
  });
  test('should show all when show-all button clicked', () => {
    const showAllButton = wrapper.find('button.Action__btn').at(2);
    showAllButton.simulate('click');
    expect(setShowingMock).toBeCalledWith(TodoStatus.COMPLETED);
  });
})