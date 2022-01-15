import React, { useReducer } from 'react';

// styles
import "styles/theme.scss";
import "styles/global.scss";

// pages, components
import TodoPage from "pages/TodoPage";
import ThemeSwitcher from 'components/ThemeSwitcher';

import reducer, { initialState } from 'store/reducer';
import { ThemeType } from 'models/theme';

function App() {
  const [{ theme }, dispatch] = useReducer(reducer, initialState);

  return (
    <main className={`theme app ${theme}`} data-test="app">
      <TodoPage />
      <ThemeSwitcher theme={theme || ThemeType.LIGHT} dispatch={dispatch}/>
    </main>
  );
}

export default App;
