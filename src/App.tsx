import React, { PropsWithChildren } from 'react'

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import SignIn from './containers/SignIn'
import Todo from './containers/Todo'

import './App.scss'
import { connect, DispatchProp, Matching } from 'react-redux'
import { ReducerType } from './redux/types'
import { AppProps } from './types/App'

function App(props: PropsWithChildren<Matching<{ token: string | undefined; } & DispatchProp<any>, AppProps>>) {
    const { token } = props
    return (
        <main className="App">
            <BrowserRouter>
                {Boolean(token) ? (
                    <Switch>
                        <Route path="/todo" exact component={Todo} />
                        <Redirect to="/todo" />
                    </Switch>
                ) : (
                    <Switch>
                        <Route path="/" exact component={SignIn} />
                        <Redirect to="/" />
                    </Switch>
                )}
            </BrowserRouter>
        </main>
    )
}

const mapStateToProps = (state: ReducerType) => ({
    token: state.auth.token
})
export default connect(mapStateToProps)(App)