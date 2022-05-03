import React from "react";

import ToDoPage from "./ToDoPage";

import "./App.css";
import Header from "./header";

function App() {
  return (
    <main className="App">
      <Header />
      <ToDoPage />
    </main>
  );
}

export default App;
