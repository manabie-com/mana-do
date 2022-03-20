import React from "react";
import Styles from "./app.module.scss";
import ToDo from "./todo";

function App() {
  return (
    <main className={Styles.App}>
      <ToDo />
    </main>
  );
}

export default App;
