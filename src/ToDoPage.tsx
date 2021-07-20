import React, {useRef, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {FaPlus} from "react-icons/fa";

import {createTodo, setTodos, todosLoading} from './store/actions';
import Service from './service';
import Footer from './features/footer/Footer';
import {GlobalContextType, StateContext} from "./App";
import TodoList from "./features/todos/TodoList";
import Layout from "./Layout";

const ToDoPage = () => {
  const history = useHistory();
  const {state: {todos}, dispatch} = React.useContext<GlobalContextType>(StateContext);
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
        // setTodosValue(todosValue.concat(resp));
        dispatch(createTodo(resp));
        inputRef.current.value = '';
      } catch (e) {
        if (e.response.status === 401) {
          history.push('/')
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
