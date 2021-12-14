import React from "react";

import ToDoPage from "./containers/ToDoPage/ToDoPage";

import "./App.css";

function App() {
  return (
    <main className="App">
      <div className="circle__top"></div>
      <div className="circle__bottom"></div>
      <ToDoPage />
    </main>
  );
}

export default App;
