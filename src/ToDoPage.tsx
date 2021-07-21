import React, {useRef, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {FaPlus} from "react-icons/fa";

import {createTodo, setTodos, todosLoading} from './store/actions';
import Service from './service/api-frontend';

import Footer from './features/footer/Footer';
import TodoList from "./features/todos/TodoList";
import Layout from "./Layout";
import {useAppContext} from './AppContext';
import {ROUTES} from "./utils/constants";

const ToDoPage = () => {
  const history = useHistory();
  const {state: {todos}, dispatch} = useAppContext();
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
          dispatch({ type: 'FETCH_TODO_LIST_FAILURE' });
        }
      }
    }

    fetchTodos();

    return () => {
      didCancel = true;
    }
  }, [])

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      try {
        const resp = await Service.createTodo(inputRef.current.value);
        const newTodosValue = [...todosValue]
        newTodosValue.unshift(resp);
        setTodosValue(newTodosValue);
        dispatch(createTodo(resp));
        inputRef.current.value = '';
      } catch (e) {
        if (e.response.status === 401) {
          history.push(ROUTES.SIGN_IN)
        }
      }
    }
  }

  return (
    <Layout>
      <section className="ToDo__container">
        <h2>Todos</h2>
        <div className="ToDo__app">
          <div className="Todo__creation">
            <FaPlus className="Todo__creation_icon"/>
            <input
              ref={inputRef}
              className="Todo__input"
              placeholder="Add a Task"
              onKeyDown={onCreateTodo}
            />
          </div>
          <TodoList/>
          <Footer/>
        </div>
      </section>
    </Layout>
  );
};

export default ToDoPage;
