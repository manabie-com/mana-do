import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import SignInPage from './SignInPage'
import TodoPage from './ToDoPage'

import './App.css'
import TodoContextProvider from './context/TodoContext'

function App() {
  return (
    <TodoContextProvider>
      <main className='App'>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={SignInPage} />
            <Route path='/todo' component={TodoPage} />
          </Switch>
        </BrowserRouter>
      </main>
    </TodoContextProvider>
  )
}

export default App
