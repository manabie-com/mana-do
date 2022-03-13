import React from 'react';
import { Provider } from 'react-redux';
import ToDoPage from './modules/ToDoPage';
import { store, persistor } from '../src/store';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToDoPage />
      </PersistGate>
    </Provider>
  );
}

export default App;
