import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import routes from './config/routes'
function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props: RouteComponentProps<any>) => (
                  <route.component {...props} {...route.props} />
                )}
              />
            )
          })}
          {/* <Route path="/todo" component={ToDoPage}/> */}
        </Switch>
      </BrowserRouter>
    </main>
  )
}

export default App
