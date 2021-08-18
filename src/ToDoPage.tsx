import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { State, actionCreators } from "./store";
import { TodoStatus } from "./models";
import { RouteComponentProps } from "react-router-dom";
import Service from "./service";
import { isTodoCompleted } from "./utils";
import { Dispatch } from "redux";
import List from "./components/List";
import Header from "./components/Header";
import Footer from "./components/Footer";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch: Dispatch<any> = useDispatch();
  const {
    setTodos,
    createTodo,
    updateTodoStatus,
    toggleAllTodos,
    deleteAllTodos,
  } = bindActionCreators(actionCreators, dispatch);
  const { todos } = useSelector((state: State) => state.todolist);
  // Api call
  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      setTodos(resp || []);
      console.log("todos fetched");
    })();
  }, [setTodos]);

  // create listening to "enter"
  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    //only allow not empty todo
    if (
      e.key === "Enter" &&
      inputRef.current &&
      inputRef.current.value.length > 0
    ) {
      try {
        const resp = await Service.createTodo(inputRef.current.value);
        createTodo(resp);
        inputRef.current.value = "";
      } catch (e) {
        if (e.response.status === 401) {
          history.push("/");
        }
      }
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    updateTodoStatus(todoId, e.target.checked);
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleAllTodos(e.target.checked);
  };

  const onDeleteAllTodo = () => {
    deleteAllTodos();
  };
  // setting view
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
  return (
    <div className="ToDo__container">
      <Header inputRef={inputRef} onCreateTodo={onCreateTodo} />
      <List
        showTodos={showTodos}
        onUpdateTodoStatus={onUpdateTodoStatus}
        isTodoCompleted={isTodoCompleted}
      />
      <Footer
        todos={todos}
        isTodoCompleted={isTodoCompleted}
        setShowing={setShowing}
        onDeleteAllTodo={onDeleteAllTodo}
        onToggleAllTodo={onToggleAllTodo}
        showing={showing}
      />
    </div>
  );
};

export default ToDoPage;
