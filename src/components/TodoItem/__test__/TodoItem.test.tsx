import React from 'react';
import {TodoItem, TodoItemProps} from 'components';
import {Todo, TodoStatus} from 'models/todo';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';

const mockTodo: Todo = {
  id: '231-s',
  content: 'some tasks',
  status: TodoStatus.ACTIVE,
  user_id: 'user1',
  created_date: new Date().toISOString(),
};
const mockEditing = '231-d';
const mockOnUpdateTodoStatus = jest.fn();
const mockOnDeleteTodo = jest.fn();
const mockOnTodoDoubleClick = jest.fn();
const mockOnToggleEditTodo = jest.fn();
const mockOnUpdateTodoContent = jest.fn();
const props: TodoItemProps = {
  todo: mockTodo,
  editing: mockEditing,
  onDeleteTodo: mockOnDeleteTodo,
  onUpdateTodoContent: mockOnUpdateTodoContent,
  onTodoDoubleClick: mockOnTodoDoubleClick,
  onToggleEditTodo: mockOnToggleEditTodo,
  onUpdateTodoStatus: mockOnUpdateTodoStatus,
};
describe('TodoItem component', () => {
  describe('initialized with mock props', () => {
    afterEach(cleanup);
    beforeEach(() => {
      render(<TodoItem {...props} />);
    });
    it('the component should not be edit mode', () => {
      expect(screen.queryByTestId('todo-item')).toBeInTheDocument();
      expect(screen.queryByTestId('todo-item--edit')).not.toBeInTheDocument();
    });
    it('the todo content should be displayed', () => {
      expect(screen.getByText(mockTodo.content)).toBeInTheDocument();
    });
    it('the todo content should not have completed class', () => {
      expect(screen.getByTestId('todo-item')).not.toHaveClass('ToDo__item--completed');
    });
    it('the checkbox should not be checked', () => {
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });
    it('trigger change status event to completed', () => {
      const statusCheckBox:HTMLInputElement = screen.getByRole('checkbox')
      fireEvent.click(statusCheckBox)
      expect(mockOnUpdateTodoStatus).toHaveBeenCalledTimes(1)
      expect(mockOnUpdateTodoStatus).toHaveBeenCalledWith(mockTodo.id,true)
    });
    it('trigger delete todo event when click button', () => {
      const deleteBtn:HTMLButtonElement = screen.getByRole('button')
      fireEvent.click(deleteBtn)
      expect(mockOnDeleteTodo).toHaveBeenCalledTimes(1)
      expect(mockOnDeleteTodo).toHaveBeenCalledWith(mockTodo.id)
    });
  });
  describe('initialized with todo status is completed', () => {
    afterEach(cleanup);
    beforeEach(() => {
      const newProps = {...props,todo:{...props.todo,status:TodoStatus.COMPLETED}}
      render(<TodoItem {...newProps} />);
    });
    it('the checkbox should not be checked', () => {
      expect(screen.getByRole('checkbox')).toBeChecked();
    });
    it('trigger change status event to active', () => {
      const statusCheckBox:HTMLInputElement = screen.getByRole('checkbox')
      fireEvent.click(statusCheckBox)
      expect(mockOnUpdateTodoStatus).toHaveBeenCalledTimes(1)
      expect(mockOnUpdateTodoStatus).toHaveBeenCalledWith(mockTodo.id,false)
    });
    it('the todo content should have completed class', () => {
      expect(screen.getByTestId('todo-item')).toHaveClass('ToDo__item--completed');
    });
    it('change to edit mode when double click', () => {
      const todoElement = screen.getByText(mockTodo.content)
      fireEvent.doubleClick(todoElement)
      expect(mockOnTodoDoubleClick).toHaveBeenCalledTimes(1)
      expect(mockOnTodoDoubleClick).toHaveBeenCalledWith(mockTodo.id)
    });
  });
  describe('initialized with edit mode', () => {
    afterEach(cleanup);
    beforeEach(() => {
      const newProps = {...props,editing:mockTodo.id}
      render(<TodoItem {...newProps} />);
    });
    it('the component should not be edit mode', () => {
      expect(screen.queryByTestId('todo-item')).not.toBeInTheDocument();
      expect(screen.queryByTestId('todo-item--edit')).toBeInTheDocument();
    });
    it('the edit input default value is the same with todo content', () => {
      const editElement:HTMLInputElement = screen.getByTestId('todo-item--edit')
      expect(editElement.value).toBe(mockTodo.content);
    });
    it('should not trigger edit event when the input is empty', () => {
      const editElement:HTMLInputElement = screen.getByTestId('todo-item--edit')
      fireEvent.change(editElement,{target: {value : ''}})
      fireEvent.keyDown(editElement, {key: 'Enter', code: 'Enter', charCode: 13})
      expect(mockOnUpdateTodoContent).toHaveBeenCalledTimes(0)
    });
    it('trigger edit event when press enter', () => {
      const editElement:HTMLInputElement = screen.getByTestId('todo-item--edit')
      fireEvent.change(editElement,{target: {value : 'some tasks edited'}})
      fireEvent.keyDown(editElement, {key: 'Enter', code: 'Enter', charCode: 13})
      expect(mockOnUpdateTodoContent).toHaveBeenCalledTimes(1)
      expect(mockOnUpdateTodoContent).toHaveBeenCalledWith(mockTodo.id,'some tasks edited')
      expect(mockOnToggleEditTodo).toHaveBeenCalledTimes(1)
    });
  });
});
