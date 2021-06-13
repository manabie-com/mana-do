import {BrowserRouter, Route, Switch} from "react-router-dom";
import SignInPage from "./sign-in";
import ToDoPage from "./todo";
import React from "react";


const App = (): JSX.Element => (
    <main className="App">
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={SignInPage}/>
                <Route path="/todo" component={ToDoPage}/>
            </Switch>
        </BrowserRouter>
    </main>
)

export {SignInPage,ToDoPage};
export default App;