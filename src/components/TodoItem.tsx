import React from "react";
import {Todo} from "../models/todo";
import {isTodoCompleted} from '../utils';
import EditableInput from './EditableInput';
import IconCross from '../assets/images/icon-cross.svg';

interface TodoItemProps {
  todo: Todo;
  updateTodoStatus: (todoId: string, completed: boolean) => void;
  deleteTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  updateTodoStatus,
  deleteTodo,
  updateTodo,
}) => {
  return (
    <div className={`Todo__card Todo__item ${isTodoCompleted(todo) ? 'completed' : ''}`}>
      <div className="Todo__cb_container">
        <input
          className="Todo__checkbox"
          type="checkbox"
          data-testid={`todo-checkbox-${todo.id}`}
          checked={isTodoCompleted(todo)}
          onChange={(e) => updateTodoStatus && updateTodoStatus(todo.id, e.target.checked)}
        />
        <span className="Todo__check" />
      </div>
      <EditableInput
        data-testid={`todo-content-${todo.id}`}
        editable={!isTodoCompleted(todo)}
        value={todo.content}
        onSave={newValue => updateTodo && updateTodo({
          ...todo,
          content: newValue
        })}
      />
      <button
        className="Todo__delete"
        data-testid={`todo-delete-${todo.id}`}
        onClick={() => deleteTodo && deleteTodo(todo)}
      >
        <img alt="" src={IconCross} />
      </button>
    </div>
  );
};

export default TodoItem;
