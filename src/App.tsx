import { UpCircleTwoTone } from "@ant-design/icons";
import { BackTop } from "antd";
import React from "react";
import "./App.css";
import ToDoPage from "./page/ToDoPage";

function App() {
  return (
    <main className="App">
      <ToDoPage />
      <BackTop>
        <UpCircleTwoTone className="BackTop__btn" />
      </BackTop>
    </main>
  );
}

export default App;
