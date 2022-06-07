import React, { useEffect, useRef, useState } from "react";
import { Todo, TodoStatus } from "./models/todo";
import { TO_DO_LIST } from "./utils/const";

const ToDoPage = () => {
  const [toDoList, setToDoList] = useState<Todo[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const list = localStorage.getItem(TO_DO_LIST) || "";
    if (list) {
      setToDoList(JSON.parse(list));
    }
  }, [reload]);

  const reloadToDoList = (list: Todo[]) => {
    localStorage.setItem(TO_DO_LIST, JSON.stringify(list));
    setReload(!reload);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      toDoList.push({
        id: Math.random(),
        content: inputRef.current ? inputRef.current.value : "",
        status: TodoStatus.ACTIVE,
      });
      reloadToDoList(toDoList);
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: number
  ) => {
    toDoList[todoId].status = e.target.checked
      ? TodoStatus.COMPLETED
      : TodoStatus.ACTIVE;
    reloadToDoList(toDoList);
  };

  const onDeleteAllTodo = () => {
    reloadToDoList([]);
  };

  const filterByStatus = (status: string) => {
    const list = JSON.parse(localStorage.getItem(TO_DO_LIST) || "");
    setToDoList(list.filter((todo: Todo) => todo.status === status));
  };

  const deleteToDoTask = async (id: number) => {
    reloadToDoList(toDoList.filter((item: Todo) => item.id !== id));
  };

  const updateToDoContent = (e: any, index: number) => {
    const inputElement = document.getElementById(`span-${index}`);
    if (inputElement) {
      document.addEventListener("click", function (ev: any) {
        var isClickInsideElement = inputElement.contains(ev.target);
        if (!isClickInsideElement) {
          window.location.reload();
        } else {
          inputElement.contentEditable = "true";
        }
      });
      inputElement.onkeydown = (event: any) => {
        if (event.key === "Enter") {
          const textInput = inputElement.innerText.trim();
          if (textInput.length > 0) {
            toDoList[index].content = textInput;
            reloadToDoList(toDoList);
            window.location.reload();
          } else {
            alert("Task can not be blanked");
          }
        }
      };
    }
  };

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
        {toDoList.map((todo: Todo, index: number) => {
          return (
            <div key={index} className="ToDo__item">
              <input
                type="checkbox"
                checked={todo.status === TodoStatus.COMPLETED}
                onChange={(e) => onUpdateTodoStatus(e, index)}
              />
              <span
                id={`span-${index}`}
                onClick={(e) => updateToDoContent(e, index)}
              >
                {todo.content}
              </span>
              <button
                className="Todo__delete"
                onClick={() => deleteToDoTask(todo.id)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
      <div className="Todo__toolbar">
        <div className="Todo__tabs">
          <button
            className="Action__btn"
            onClick={() =>
              setToDoList(JSON.parse(localStorage.getItem(TO_DO_LIST) || ""))
            }
          >
            All
          </button>
          <button
            className="Action__btn"
            onClick={() => filterByStatus(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className="Action__btn"
            onClick={() => filterByStatus(TodoStatus.COMPLETED)}
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
