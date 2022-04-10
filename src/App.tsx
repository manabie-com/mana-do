import React, { createContext, useReducer, useCallback } from 'react';
import { ToDoPage } from 'components/ToDoPage';
import './App.scss';
import reducer, { initialState } from 'store/reducer';
import { TodoType } from 'models/todo';

export const TodoContext = createContext<TodoType>({
  todos: [],
  filter: '',
  dispatch: () => {}
});

function App() {
  const [{ todos, filter }, dispatch] = useReducer(useCallback(reducer, []), initialState);

  return (
    <TodoContext.Provider value={{todos, filter, dispatch}}>
      <main className="App">
        <ToDoPage />
      </main>
    </TodoContext.Provider>
  );
}

export default App;
