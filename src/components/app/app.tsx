import React from 'react'

import { BrowserRouter, Switch } from 'react-router-dom'

import { AuthContextProvider } from '../../store/contexts/auth'
import { TodoContextProvider } from '../../store/contexts/todo'

import SignInPage from '../../pages/sign-in'
import TodoPage from '../../pages/todo'
import RestrictedRoute from '../restricted-route'
import PrivateRoute from '../private-route'

import styles from './app.module.css'

const App = (): JSX.Element => {
  return (
    <main className={styles.app}>
      <AuthContextProvider>
        <TodoContextProvider>
          <BrowserRouter>
            <Switch>
              <RestrictedRoute path='/' exact component={SignInPage} />
              <PrivateRoute path='/todo' component={TodoPage} />
            </Switch>
          </BrowserRouter>
        </TodoContextProvider>
      </AuthContextProvider>
    </main>
  )
}

export default App
