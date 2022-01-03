import React from 'react';
import {TodoToolbar} from 'components';
import {fireEvent, render, screen} from '@testing-library/react';
import {EnhanceTodoStatus, TodoStatus} from 'models';
import {TodoToolbarProps} from '..';

const mockShowing: EnhanceTodoStatus = 'ALL';
const mockOnToggleAllTodo = jest.fn();
const mockOnDeleteAllTodo = jest.fn();
const mockOnSetShowing = jest.fn();
const props: TodoToolbarProps = {
  todoAmount : 5,
  activeTodos: 1,
  showing: mockShowing,
  onToggleAllTodo: mockOnToggleAllTodo,
  onSetShowing: mockOnSetShowing,
  onDeleteAllTodo: mockOnDeleteAllTodo,
};
describe('TodoToolbar component', () => {
  describe('initialized with activeTodos is 0,1 and 5', () => {
    it('should display todos when number of active todos is one', () => {
      render(<TodoToolbar {...props} />);
      expect(screen.getByText('1 todo left')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).not.toBeChecked()
    });
    it('should display todos when number of active todos is greater than one', () => {
      const newProps = {...props, activeTodos: 5};
      render(<TodoToolbar {...newProps} />);
      expect(screen.getByText('5 todos left')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).not.toBeChecked()

    });
    it('should display todos when number of active todos is zero', () => {
      const newProps = {...props, activeTodos: 0};
      render(<TodoToolbar {...newProps} />);
      expect(screen.getByText('0 todo left')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeChecked()
    });
  });
  describe('initialized with different todoAmount prop', () => {
    it('should checkbox be displayed when todoAmount is greater than 0', () => {
      render(<TodoToolbar {...props} />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });
    it('should checkbox not be displayed when todoAmount is equal 0', () => {
      const newProps = {...props,todoAmount:0}
      render(<TodoToolbar {...newProps} />);
      expect(screen.queryByRole('checkbox')).toBeNull();
    });
  });
  describe('initialized with different showing prop', () => {
    it('should button all have class active in first render', () => {
      render(<TodoToolbar {...props} />);
      const btnElement = screen.getByRole('button', {name: 'All'});
      expect(btnElement).toHaveClass('Action__btn--active');
    });
    it('should button active have active class when showing is active', () => {
      const newProps = {...props, showing: TodoStatus.ACTIVE};
      render(<TodoToolbar {...newProps} />);
      const btnElement = screen.getByRole('button', {name: 'Active'});
      expect(btnElement).toHaveClass('Action__btn--active');
    });
    it('should button complete have active class when showing is completed', () => {
      const newProps = {...props, showing: TodoStatus.COMPLETED};
      render(<TodoToolbar {...newProps} />);
      const btnElement = screen.getByRole('button', {name: 'Completed'});
      expect(btnElement).toHaveClass('Action__btn--active');
    });
  });
  describe('Should action buttons tab be triggered', () => {
    beforeEach(() => {
      render(<TodoToolbar {...props} />);
    });
    it('trigger show active todos event when active button is clicked', () => {
      const btnElement = screen.getByRole('button', {name: 'Active'});
      fireEvent.click(btnElement);
      expect(mockOnSetShowing).toHaveBeenCalledTimes(1);
      expect(mockOnSetShowing).toHaveBeenCalledWith(TodoStatus.ACTIVE);
    });
    it('trigger show active todos event when completed button is clicked', () => {
      const btnElement = screen.getByRole('button', {name: 'Completed'});
      fireEvent.click(btnElement);
      expect(mockOnSetShowing).toHaveBeenCalledTimes(1);
      expect(mockOnSetShowing).toHaveBeenCalledWith(TodoStatus.COMPLETED);
    });
    it('trigger delete all todos event when clear all todos button is clicked',()=>{
      const btnElement = screen.getByRole('button', {name: 'Clear all todos'});
      fireEvent.click(btnElement);
      expect(mockOnDeleteAllTodo).toHaveBeenCalledTimes(1);
    })
  });
  describe('trigger toggle all todos event when checkbox is clicked', () => {
    it('trigger toggle all todos event when checkbox is clicked', () => {
      render(<TodoToolbar {...props} />)
      const checkBoxElement = screen.getByRole('checkbox');
      fireEvent.click(checkBoxElement);
      expect(mockOnToggleAllTodo).toHaveBeenCalledTimes(1);
      expect(mockOnToggleAllTodo).toHaveBeenCalledWith(true)
    });
    it('trigger toggle all todos event when active todo is greater than 0', () => {
      render(<TodoToolbar {...props} />)
      const checkBoxElement = screen.getByRole('checkbox');
      expect(checkBoxElement).not.toBeChecked()
      fireEvent.click(checkBoxElement);
      expect(mockOnToggleAllTodo).toHaveBeenCalledTimes(1);
      expect(mockOnToggleAllTodo).toHaveBeenCalledWith(true)
    });
    it('trigger toggle all todos event when active todo is equal 0', () => {
      const newProps = {...props,activeTodos:0}
      render(<TodoToolbar {...newProps} />)
      const checkBoxElement = screen.getByRole('checkbox');
      expect(checkBoxElement).toBeChecked()
      fireEvent.click(checkBoxElement);
      expect(mockOnToggleAllTodo).toHaveBeenCalledTimes(1);
      expect(mockOnToggleAllTodo).toHaveBeenCalledWith(false)
    });
  });
});
