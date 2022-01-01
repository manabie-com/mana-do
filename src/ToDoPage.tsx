import React, { useEffect, useReducer, useRef, useState } from "react";
import { Todo, TodoStatus } from "./models/todo";
import Service from "./service";
import {
  createTodo, deleteAllTodos, deleteTodo, setTodos, toggleAllTodos, updateTodoContent, updateTodoStatus
} from "./store/actions";
import reducer, { initialState } from "./store/reducer";
import { isTodoCompleted } from "./utils";


type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [editingID, setEditingID] = useState('')
  const [editingContent, setEditContent] = useState('')

  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  //always focus input of editing element
  useEffect(() => {
    if (editingID && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editingID])

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    //add validate for input, not create new task if the input is empty
    if (e.key === "Enter" && inputRef.current?.value) {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
      inputRef.current.value = "";
    }
  };

  const onUpdateTodoStatus = async (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    const checked = e.target.checked
    await Service.updateTodoStatus(todoId, checked)
    dispatch(updateTodoStatus(todoId, checked));
  };

  const onToggleAllTodo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    await Service.toggleAllTodos(checked)
    dispatch(toggleAllTodos(checked));
  };

  const onDeleteTodo = async (id: string) => {
    await Service.deleteTodo(id)
    dispatch(deleteTodo(id))
  }


  const onDeleteAllTodo = async () => {
    await Service.deleteAllTodos()
    dispatch(deleteAllTodos());
  }

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const onClickEditTodo = (todo: Todo) => {
    setEditingID(todo.id)
    setEditContent(todo.content)
  }

  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditContent(e.target.value)
  }

  const onUpdateContent = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editingContent) {
      await Service.updateTodoContent(editingID, editingContent)
      dispatch(updateTodoContent(editingID, editingContent))
      setEditingID('')
    }
  }

  const onDiscardChangeContent = () => {
    setEditingID('')
  }

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="ToDo__list">
        {showTodos.map((todo) => {
          return (
            //should assign a unique value for key 
            <div key={todo.id} className="ToDo__item">
              <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              {todo.id === editingID ?
                <input
                  type="text"
                  ref={editInputRef}
                  value={editingContent}
                  onChange={onChangeContent}
                  onKeyDown={onUpdateContent}
                  onBlur={onDiscardChangeContent}
                /> :
                <span onDoubleClick={() => onClickEditTodo(todo)}>{todo.content}</span>
              }
              <button
                className="Todo__delete"
                onClick={() => onDeleteTodo(todo.id)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input
            type="checkbox"
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button
            className={`Action__btn ${showing === "ALL" ? "current" : ""}`}
            onClick={() => setShowing("ALL")}
          >
            All
          </button>
          <button
            className={`Action__btn ${showing === TodoStatus.ACTIVE ? "current" : ""
              }`}
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`Action__btn ${showing === TodoStatus.COMPLETED ? "current" : ""
              }`}
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
