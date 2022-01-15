import React, { useReducer } from 'react';

// styles
import "styles/theme.scss";
import "styles/global.scss";

// pages, components
import TodoPage from "pages/TodoPage";
import ThemeSwitcher from 'components/ThemeSwitcher';

import reducer, { initialState } from 'store/reducer';
import { toggleTheme } from 'store/action-creators';

function App() {
  const [{ theme }, dispatch] = useReducer(reducer, initialState);

  const onChangeTheme = (): void => {
    dispatch(toggleTheme())
  } 

  return (
    <main className={`theme app ${theme}`} data-test="app">
      <TodoPage />
      <ThemeSwitcher theme={theme} onChange={onChangeTheme}/>
    </main>
  );
}

export default App;
