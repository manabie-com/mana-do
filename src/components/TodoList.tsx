import React, { useState } from 'react';
import { isTodoCompleted } from '../utils';
import { TodoStatus } from '../models/todo';
import { Todo, TodoListInterface } from '../models/todo';
import TodoEditForm from './TodoEditForm';

const TodoList = (props: TodoListInterface) => {
  const emptyTodo = { id: '', user_id: '', content: '', created_date: ''}
  const [todoEdit, setTodoEdit] = useState(emptyTodo);

  const showTodos = props.todos && props.todos.filter((todo) => {
    switch (props.showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const onEdit = (todo: Todo) => {
    setTodoEdit(todo)
  }

  const onUpdateTodo = (todo: Todo) => {
    props.onUpdateTodoContent(todo.id, todo.content)
    setTodoEdit(emptyTodo)
  }

  const onCancelUpdate = () => {
    setTodoEdit(emptyTodo)
  }

  return (
    <div className="ToDo__list" data-testid="todo-list">
      { props.showing === 'ALL' && (<p>All to-do list: <strong>{ showTodos?.length }</strong></p>)}
      { props.showing === 'ACTIVE' && (<p>Active to-do list: <strong>{ showTodos?.length }</strong></p>)}
      { props.showing === 'COMPLETED' && (<p>Completed to-do list: <strong>{ showTodos?.length }</strong></p>)}
      { showTodos && showTodos.map((todo, index) => (
          <div key={todo.id}>
            {todoEdit.id === todo.id ? (
              <TodoEditForm
                todo={todo}
                onUpdateTodo={onUpdateTodo}
                onCancelUpdate={onCancelUpdate}
              />
            ) : (
              <div key={index} className="ToDo__item">
                <input
                  type="checkbox"
                  checked={isTodoCompleted(todo)}
                  onChange={(e) => props.onUpdateTodoStatus(e, todo.id)}
                />
                <span onClick={() => onEdit(todo)}>{todo.content}</span>
                <button
                  className="Todo__delete"
                  onClick={() => props.onDelete(todo.id)}
                >
                  X
                </button>
              </div>
            )}
          </div>
        ))
      }
    </div>
  )
}

export default TodoList