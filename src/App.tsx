import React from 'react';

import {BrowserRouter} from 'react-router-dom';
import {PageRoutes} from "./routes/page.route";

import './App.css';


function App() {
    return (
        <main className="App">
            <BrowserRouter>
                <PageRoutes/>
            </BrowserRouter>
        </main>
    );
}

export default App;
