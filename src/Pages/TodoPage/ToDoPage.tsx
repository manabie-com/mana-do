import React, {
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { RouteComponentProps } from "react-router-dom";

import reducer, { initialState } from "../../store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  editContent,
} from "../../store/actions";
import Service from "../../service";
import { TodoStatus } from "../../models/todo";
import { isTodoCompleted } from "../../utils";
import {useOutsideAlerter} from "../../component/clickOutSide"
type EnhanceTodoStatus = TodoStatus | "ALL";
type ModeEditContent = {
  status: boolean;
  id: string;
};
const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const [modeEdit, setModeEdit] = useState<ModeEditContent>({
    status: false,
    id: "",
  });

  const discardEdit = (): any =>{
    setModeEdit({
      status: false,
      id: ''
    })
  }

  // check if click outside input will discard editing
  useOutsideAlerter(contentRef, discardEdit);
  
  
  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current?.value) {
      //i add '?' behind current to check if input does not have any letters 
      
      try {
        const resp = await Service.createTodo(inputRef.current.value);

        dispatch(createTodo(resp));

        inputRef.current.value = "";
      } catch (e) {
        if (e.response.status === 401) {
          history.push("/");
        }
      }
    }
  };

  const handleEditContent = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoId: string
  ) => {
    if (e.key === "Enter" && contentRef.current?.value) {
      
      try {
        dispatch(editContent(todoId, contentRef.current.value));
        setModeEdit({ status: false, id: "" });
      } catch (e) {
        alert(e);
      }
    }
  };

 
  const changeStatusEditContent = (todoId: string) => {
    setModeEdit({ status: true, id: todoId });
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

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

  return (
    <div className="Todo__container">
      <div className="Todo__wrap">
        <div className="Todo__creation">
          <input
            ref={inputRef}
            className="Todo__input"
            placeholder="What need to be done?"
            onKeyDown={onCreateTodo}
          />
        </div>
        <div className="Todo__toolbar">
          <div className="Todo__tabs">
            <button className="Action__btn" onClick={() => setShowing("ALL")}>
              All
            </button>
            <button
              className="Action__btn"
              onClick={() => setShowing(TodoStatus.ACTIVE)}
            >
              Active
            </button>
            <button
              className="Action__btn"
              onClick={() => setShowing(TodoStatus.COMPLETED)}
            >
              Completed
            </button>
          </div>
          <button className="Action__btn" onClick={onDeleteAllTodo}>
            Clear all todos
          </button>
          {todos.length > 0 ? (
            <input
              style={{ cursor: "pointer" }}
              type="checkbox"
              checked={activeTodos === 0}
              onChange={onToggleAllTodo}
            />
          ) : (
            <div style={{ width: "12.8px" }}></div>
          )}
        </div>
        <div className="Todo__list">
          {showTodos.map((todo, index) => {
            return (
              <div key={index} className="Todo__item">
                <input
                  style={{ cursor: "pointer" }}
                  type="checkbox"
                  checked={isTodoCompleted(todo)}
                  onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                />
                {/* when double click to content, span will convert to input to edit  */}
                {modeEdit && modeEdit.id === todo.id ? (
                  <input
                    onKeyDown={(e) => handleEditContent(e, todo.id)}
                    ref={contentRef}
                    style={{
                      marginLeft: "10px",
                      boxShadow:
                        "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
                      padding: "7px 2px",
                      marginRight: "5px",
                    }}
                    className="Todo__input"
                    placeholder={todo.content}
                  />
                ) : (
                  <span
                    style={{ marginRight: "5px" }}
                    onDoubleClick={(e) => {
                      changeStatusEditContent(todo.id);
                    }}
                  >
                    {todo.content}
                  </span>
                )}

                <button
                  className="Todo__delete"
                  onClick={() => dispatch(deleteTodo(todo.id))}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToDoPage;
