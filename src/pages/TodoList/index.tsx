import classNames from 'classnames';
import React from 'react';
import './todo-list.scss';

import Todo from '../../models/todo';
import TotoItem from './TodoItem';

export interface TodoListInterface {
  todoList: Todo[];
  handleUpdateTodoStatus: (todo: Todo, checked: boolean) => void;
  handleUpdateTodoContent: (todo: Todo, content: string) => void;
  handleDeleteTodo: (todo: Todo) => void;
}

const TodoList = (props: TodoListInterface) => {
  const {
    handleUpdateTodoStatus,
    todoList,
    handleUpdateTodoContent,
    handleDeleteTodo,
  } = props;

  return (
    <div
      className={classNames('todo__list', {
        'todo__list-scroll': todoList.length > 5,
      })}
      data-test="todo-list">
      {todoList.length === 0 ? (
        <span data-test="nothing-to-do">Don't have todo</span>
      ) : (
        todoList.map((todo) => {
          return (
            <TotoItem
              data-test="todo-item"
              key={todo.id}
              todo={todo}
              handleUpdateTodoStatus={handleUpdateTodoStatus}
              handleDeleteTodo={handleDeleteTodo}
              handleUpdateTodoContent={handleUpdateTodoContent}
            />
          );
        })
      )}
    </div>
  );
};

export default TodoList;
