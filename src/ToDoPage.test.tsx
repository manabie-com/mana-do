import { render } from "@testing-library/react";
import ToDoPage from "./ToDoPage";
import { configure, mount, shallow, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe('testing todo page', () => {
  beforeEach(() => {
    // render(<ToDoPage />)
  })

  test('input must be rendered', () => {
    const wrapper = mount(<ToDoPage />);
    const input = wrapper.find('input.Todo__input');
    expect(input).toBeTruthy();
  })
})