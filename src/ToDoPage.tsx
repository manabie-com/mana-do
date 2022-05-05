import React, { useEffect, useReducer, useRef, useState } from "react";
import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  editTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  deleteTodo,
} from "./store/actions";
import Service from "./service";
import { TodoStatus } from "./models/todo";

type EnhanceTodoStatus = TodoStatus;

const ToDoPage = () => {
  const [curContent, setCurContent] = useState("")
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>(TodoStatus.ALL);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(todos));
  }, [ todos ]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoIndex: number
  ) => {
    dispatch(updateTodoStatus(todoIndex, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const onEditTodo = (index: number, content: string, status: boolean) => {
    dispatch(editTodo(index, content, status));
  };

  return (
    <div className="ToDo__container" data-testid="todoConatiner">
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
          data-testid="inputTodo"
        />
      </div>
      <div className="ToDo__list">
        {todos.map((todo, index) => {
          return (
            (showing === TodoStatus.ALL || showing === todo.status) && (
              <div key={todo.id} className="ToDo__item" data-testid="todoList">
                <input
                  type="checkbox"
                  checked={todo.status === TodoStatus.COMPLETED}
                  onChange={(e) => onUpdateTodoStatus(e, index)}
                  data-testid="todoListCheckbox"
                />
                {todo.editing ? (
                    <input 
                    onBlur={() => { onEditTodo(index, todo.content, false) }} 
                    name={todo.id} 
                    type="text" 
                    defaultValue={todo.content}
                    onKeyPress={(e) => {e.which === 13 && onEditTodo(index, curContent, false)}} 
                    onChange={(e) => setCurContent(e.target.value)} 
                    data-testid="editTodo"
                    style={{
                      flexGrow: 1
                    }}
                    autoFocus/>
                ) : (
                  <span
                    onDoubleClick={() => {
                      onEditTodo(index, todo.content, true);
                    }}
                  >
                    {todo.content}
                  </span>
                )}
                <button
                  name={todo.content}
                  className="Todo__delete"
                  onClick={() => {
                    onDeleteTodo(todo.id);
                  }}
                  data-testid="deleteTodo"
                >
                  X
                </button>
              </div>
            )
          );
        })}
      </div>
      <div className="Todo__toolbar">
        {!!todos.length && (
          <input
            type="checkbox"
            checked={todos.every(
              (todo) => todo.status === TodoStatus.COMPLETED
            )}
            onChange={onToggleAllTodo}
            data-testid="checkAll"
          />
        )}
        <div className="Todo__tabs">
          <button
            className="Action__btn ripple"
            onClick={() => setShowing(TodoStatus.ALL)}
            data-testid="btnShowAll"
          >
            All
          </button>
          <button
            className="Action__btn ripple"
            onClick={() => setShowing(TodoStatus.ACTIVE)}
            data-testid="btnShowActive"
          >
            Active
          </button>
          <button
            className="Action__btn ripple"
            onClick={() => setShowing(TodoStatus.COMPLETED)}
            data-testid="btnShowCompleted"
          >
            Completed
          </button>
        </div>
        <button 
        className="Action__btn ripple" 
        onClick={onDeleteAllTodo}
        data-testid="btnClearAll"
        >
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
