import React, { useEffect, useRef, useState } from "react";
import { Todo, TodoStatus } from "./models/todo";

const ToDoPage = () => {
  const [toDoList, setToDoList] = useState<any>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [showing, setShowing] = useState<any>([]);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    const list = localStorage.getItem("TO_DO_LIST") || "";
    if (list) {
      setToDoList(JSON.parse(list));
      setShowing(JSON.parse(list));
    } else {
      localStorage.setItem("TO_DO_LIST", JSON.stringify([]));
      setShowing([]);
    }
  }, [reload]);

  const reloadToDoList = (list: Todo[]) => {
    localStorage.setItem("TO_DO_LIST", JSON.stringify(list));
    setShowing(list);
    setReload(!reload);
    inputRef.current.value = "";
  };

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      toDoList.push({
        content: inputRef.current.value,
        status: TodoStatus.ACTIVE,
      });
      reloadToDoList(toDoList);
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
    e.target.checked
      ? (toDoList[todoId].status = TodoStatus.COMPLETED)
      : (toDoList[todoId].status = TodoStatus.ACTIVE);
    reloadToDoList(toDoList);
  };

  const onDeleteAllTodo = () => {
    reloadToDoList([]);
  };

  const filterByStatus = (status: string) => {
    setShowing(toDoList.filter((todo: Todo) => todo.status === status));
  };

  const deleteToDoTask = (index: number) => {
    toDoList.splice(index, 1);
    reloadToDoList(toDoList);
  };

  const updateToDoContent = (e: any, index: number) => {
    const element = document.getElementById(`span-${index}`);
    if (element) {
      document.addEventListener("click", function (ev: any) {
        var isClickInsideElement = element.contains(ev.target);
        if (!isClickInsideElement) {
          window.location.reload();
        } else {
          element.contentEditable = "true";
        }
      });
      element.onkeydown = (event: any) => {
        if (event.key === "Enter") {
          if (element.innerText.trim().length > 0) {
            toDoList[index].content = element.innerText.trim();
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
        {showing.map((todo: Todo, index: number) => {
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
                onClick={() => deleteToDoTask(index)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
      <div className="Todo__toolbar">
        <div className="Todo__tabs">
          <button className="Action__btn" onClick={() => setShowing(toDoList)}>
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
