import React from 'react';

// styles
import "styles/global.scss";

// pages, components
import TodoPage from "pages/TodoPage";

function App() {
  return (
    <main data-test="app">
      <TodoPage />
    </main>
  );
}

export default App;
