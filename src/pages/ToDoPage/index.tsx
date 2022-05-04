import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo, setTodos, todosLoading } from "../../store/actions";
import Service from "../../service/api-frontend";
import Footer from "../../components/Footer";
import TodoList from "../../components/todos/TodoList";
import { useAppContext } from "../../AppContext";
import { ROUTES } from "../../utils/constants";
import { Wrapper } from "./styles";

const ToDoPage = () => {
  const navigate = useNavigate();
  const {
    state: { todos },
    dispatch,
  } = useAppContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [todosValue, setTodosValue] = useState(todos);

  useEffect(() => {
    let didCancel = false;
    const fetchTodos = async () => {
      dispatch(todosLoading());
      try {
        const resp = await Service.getTodos();
        if (!didCancel) {
          dispatch(setTodos(resp));
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: "FETCH_TODO_LIST_FAILURE" });
        }
      }
    };

    fetchTodos();

    return () => {
      didCancel = true;
    };
  }, [dispatch]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputRef.current?.value) return;
    if (e.key !== "Enter") return;

    try {
      const resp = await Service.createTodo(inputRef.current.value);
      const newTodosValue = [...todosValue];
      newTodosValue.unshift(resp);
      setTodosValue(newTodosValue);
      dispatch(createTodo(resp));
      inputRef.current.value = "";
    } catch (e: any) {
      if (e.response.status === 401) {
        navigate(ROUTES.SIGN_IN);
      }
    }
  };

  return (
    <Wrapper>
      <div className="title">Draggable Todos</div>

      <div className="list-container">
        <div className="input-wrap">
          <div className="form-control">
            <input type="text" placeholder="Add a Task" ref={inputRef} onKeyDown={onCreateTodo} />
          </div>
        </div>

        <TodoList />
        <Footer />
      </div>
    </Wrapper>
  );
};

export default ToDoPage;
