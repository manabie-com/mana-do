import React from "react";

import ToDoPage from "./ToDoPage";

import "./App.css";

function App() {
  return (
    <main className="App">
      <div className="background"></div>
      <div className="main-content">
        <h1 className="title">To Do List</h1>
        <ToDoPage />
      </div>
    </main>
  );
}

export default App;
