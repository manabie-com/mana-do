import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from "enzyme";
import { TodoItem, ITodoItemProps } from "./todo-item.component";
import { TodoStatus } from "../../models/todo";

// Configuring the Enzyme Adapter
configure({ adapter: new Adapter() });

const props: ITodoItemProps = {
  index: 0,
  todo: {
    id: "todo_id_1",
    user_id: "tql247",
    content: "A todo",
    status: TodoStatus.ACTIVE,
    created_date: new Date().toISOString(),
    todo: ''
  },
  onUpdateTodoStatus: jest.fn(),
  onUpdateTodo: jest.fn(),
  onDeleteTodo: jest.fn(),
};


describe("<TodoItem />", () => {
  // Testing the TodoItem component rendering
  describe("Basic rendering test for TodoItem component", () => {
    it("Should have an input element", () => {
      const wrapper = shallow(<TodoItem {...props} />);
      expect(wrapper.find(".ToDo__checkbox").length).toBeTruthy();
      expect(wrapper.find(".ToDo__content").length).toBeTruthy();
      expect(wrapper.find(".ToDo__delete").length).toBeTruthy();
    });
  });


  it('show line when done is true', () => {
    props.todo.status = TodoStatus.COMPLETED;
    const wrapper = mount(<TodoItem {...props} />);
   const isCompleted =  wrapper.find('.ToDo__checkbox').hasClass('ToDo__item--completed');
   expect(isCompleted).toBeTruthy();
  });

  it('Should call on Toggle', () => {
    const wrapper = mount(<TodoItem {...props} />);
    wrapper.find('input[type="checkbox"]').simulate('change', {target: {checked: true}});
    expect(props.onUpdateTodoStatus).toBeCalled();
  });

  it('Should call on Remove', () => {
    const wrapper = mount(<TodoItem {...props} />);
    wrapper.find('.ToDo__delete').simulate('click');
    expect(props.onDeleteTodo).toHaveBeenCalledWith(props.todo.id);
  }); 



});