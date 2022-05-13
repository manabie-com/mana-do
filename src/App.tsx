import './App.css';
import ToDoPage from './screens/ToDoPage';
import { LogoIcon } from './themes/LogoIcon';

function App() {
  return (
    <main className="App">
      <div className="appNameContainer">
        <LogoIcon />
        <h1 style={{ marginLeft: 10 }}>TO DO LIST APP</h1>
      </div>
      <ToDoPage />
    </main>
  );
}

export default App;
