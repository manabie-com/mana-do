import React from "react";

// import { BrowserRouter, Switch, Route } from "react-router-dom";
import { BrowserRouter, Switch } from "react-router-dom";
import { AppRoutes } from "./routes";
// import SignInPage from "./pages/SignIn";
// import ToDoPage from "./pages/ToDo";
// import localStorageUtils from "./utils/localStorage.utils";

import "./App.css";

function App() {
  return (
    // <main className="App">
    //   <BrowserRouter>
    //     <Switch>
    //       <Route path="/" exact component={SignInPage} />
    //       <Route path="/todo" component={ToDoPage} />
    //     </Switch>
    //   </BrowserRouter>
    // </main>
    <main className="App">
      <BrowserRouter>
        <Switch>
          <AppRoutes />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
