import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { AppRoutes } from './routes';

function App() {
  return (
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
