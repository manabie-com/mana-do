import React, { useEffect, useReducer, useRef, useState } from 'react';
import "./styles.css"
import reducer, { initialState } from '../../store/reducer';
import { setTodos } from '../../store/actions';
import { ServiceFE } from '../../service';
import { TodoStatus, Todo } from '../../models/todo';
import TodoItem from './TodoItem';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputRef = useRef<any>(null);

  useEffect(() => {
    getTodos()
  }, [])

  const checkSelectAllTodo = (todos: Todo[]) => {
    for (const todo of todos) {
      if (todo.status === TodoStatus.ACTIVE) {
        return false
      }
    }
    return true
  }

  const getTodos = async () => {
    await ServiceFE.getTodos()
      .then(
        res => {
          dispatch(setTodos(res || []));
        }
      )
      .catch(error => console.log(error))
  }

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current.value) {
      await ServiceFE.createTodo(inputRef.current.value);
      getTodos()
      inputRef.current.value = "";
    }
  }

  const onUpdateTodoStatus = async (todoId: any, e: React.ChangeEvent<HTMLInputElement>) => {
    await ServiceFE.updateTodoStatus(todoId, e.target.checked)
    getTodos()
  }

  const onToggleAllTodo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await ServiceFE.toggleAllTodo(e.target.checked)
    getTodos()
  }

  const onDeleteAllTodo = async () => {
    await ServiceFE.deleteAllTodo()
    getTodos()
  }

  const onDeleteTodo = async (todoId: any) => {
    await ServiceFE.deleteTodo(todoId)
    getTodos()
  }
  const onUpdateTodoContent = async (todoId: any, content: any) => {
    await ServiceFE.updateTodoContent(todoId, content)
    getTodos()
  }
  return (
    <div className="ToDo__container">
      <h2>To do list</h2>
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ?
          <input
            checked={checkSelectAllTodo(todos)}
            type="checkbox"
            onChange={onToggleAllTodo}
          /> : <div />
        }
        <div className="Todo__tabs">
          <button
            className={showing === 'ALL' ? "Selected__btn" : "Action__btn"}
            onClick={() => setShowing('ALL')}
          >
            All
          </button>
          <button className={showing === TodoStatus.ACTIVE ? "Selected__btn" : "Action__btn"}
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button className={showing === TodoStatus.COMPLETED ? "Selected__btn" : "Action__btn"}
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button className='delete__all__btn' onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
      <div className="ToDo__list">
        {
          todos && todos
            .filter((todo) => showing === 'ALL' || showing === todo.status)
            .map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onChangeStatus={onUpdateTodoStatus}
                  onDeleteTodo={onDeleteTodo}
                  onUpdateTodoContent={onUpdateTodoContent}
                />
              );
            })
        }
      </div>
    </div>
  );
};

export default ToDoPage;