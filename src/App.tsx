import React from "react";
import { Provider as TodoProvider } from "./context/TodoContext";
import ToDoPage from "./pages/ToDoPage";

import "./App.css";

function App() {
  return (
    <main className="App">
      <TodoProvider>
        <ToDoPage />
      </TodoProvider>
    </main>
  );
}

export default App;
