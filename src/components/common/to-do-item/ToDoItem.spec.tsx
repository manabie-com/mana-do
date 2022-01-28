import ToDoItem from './ToDoItem';
import { shallow, mount } from 'enzyme';
import '../../../../setupTests';
import { mockTodoList } from '../../../mock/todo';
import Service from '../../../service';


jest.mock('../../../service', () => ({
    deleteTodo: jest.fn(),
    editTodo: jest.fn()
}));

describe('ToDoItem', () => {
    const mockProps = {
        todo: mockTodoList[0],
        dispatch: jest.fn()
    }
    it('Should render ToDoItem correctly', () => {
        const wrapper = shallow(<ToDoItem {...mockProps} />);
        expect(wrapper.find('.to-do__item').length).toBe(1);
        const taskContent = wrapper.find('span').at(1);
        expect(wrapper.find("input[type='checkbox']").length).toBe(1);
        expect(taskContent.length).toBe(1);
        expect(taskContent.text()).toBe("test task");
        expect(taskContent.props().contentEditable).toBeTruthy();
        expect(wrapper.find('.to-do__delete').length).toBe(1);
    });

    describe("ToDoItem Behaviors", () => {
        it("should call deleteTodo when click delete button", () => {
            const wrapper = mount(<ToDoItem {...mockProps} />);
            const deleteBtn = wrapper.find('.to-do__delete');
            deleteBtn.simulate('click');
            expect(Service.deleteTodo).toBeCalledTimes(1);
        })

        it("should call onUpdateTodoStatus when click check box", () => {
            const wrapper = mount(<ToDoItem {...mockProps} />);
            const checkbox = wrapper.find("input[type='checkbox']");
            checkbox.simulate('change', { target: { checked: false } });
            expect(Service.editTodo).toBeCalledWith("test task", "ACTIVE", "1");
        })

        it("should call onUpdateTodoContent when click on task to change content", () => {
            const wrapper = mount(<ToDoItem {...mockProps} />);
            const taskContent = wrapper.find('span').at(1);
            taskContent.simulate('blur', { target: { innerText: 'new content'} });
            expect(Service.editTodo).toBeCalledWith("new content", "COMPLETED", "1");
        })
    })
});

export { };