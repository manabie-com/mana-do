import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { POSITION, DURATION } from './component/Toast/Toast';
import SignInPage from './pages/SignIn/SignInPage';
import ToDoPage from './pages/ToDo/ToDoPage';
import './i18n/i18n';
import './App.css';

function App() {
  return (
    <main className="App">
      <ToastContainer
        autoClose={DURATION.TOAST}
        draggable={false}
        hideProgressBar={true}
        position={POSITION.TOP_RIGHT}
        limit={1}
        pauseOnFocusLoss={false}
      />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage} />
          <Route path="/todo" component={ToDoPage} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
