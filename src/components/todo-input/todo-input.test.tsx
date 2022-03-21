import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from "enzyme";
import { TodoInput, IInputTodoProps } from "./todo-input.component";

// Configuring the Enzyme Adapter
configure({ adapter: new Adapter() });

const props: IInputTodoProps = {
  onCreateTodo: jest.fn(),
};

describe("<TodoInput>", () => {

  // Testing the TodoInput component rendering
  describe("Basic rendering test for TodoInput component", () => {
    it("Should have an input element", () => {
      const wrapper = shallow(<TodoInput {...props} />);
      expect(wrapper.find('.ToDo__input').length).toBeTruthy();
    });
  });

  // Testing the TodoInput component interaction
  describe("TodoInput component functionality testing", () => {
    it("Should call the onCreateTodo fn when pressed enter and input has a value", () => {
      const wrapper = mount(<TodoInput  {...props} />);
      wrapper.find('.ToDo__input').simulate("change", { target: { value: "foo" } });
      wrapper.find('.ToDo__input').simulate('keydown', { key: 'Enter' })
      expect(props.onCreateTodo).toBeCalled();
    });

    it("Should not call the onCreateTodo fn when value is null", () => {
      const wrapper = mount(<TodoInput  {...props} />);
      wrapper.find('.ToDo__input').simulate('keydown', { key: 'Enter' })
      expect(props.onCreateTodo).toHaveBeenCalledTimes(0)
    });

    it("Should clear the input", () => {
      const wrapper = mount(<TodoInput  {...props} />);
      const inputValue = wrapper.find('.ToDo__input').props().value;
      wrapper.find('.ToDo__input').simulate("change", { target: { value: "foo" } });
      wrapper.find('.ToDo__input').simulate('keydown', { key: 'Enter' })
      expect(inputValue).toBe('');
    });

  });

});