import React from 'react';

// styles
import "styles/theme.scss";
import "styles/global.scss";

import TodoPage from "pages/TodoPage";

function App() {
  return (
    <main className={`theme app light`} data-test="app">
      <TodoPage />
    </main>
  );
}

export default App;
