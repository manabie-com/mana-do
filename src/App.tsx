import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import './styles/App.css';

import { routes } from './config/routes';
import { LoginPage } from './pages/Auth/Login';
import { LogoutPage } from './pages/Auth/Logout';
import { NotFoundPage } from './pages/NotFound';
import TodoPage from './pages/Todo';

function App() {
	return (
		<main className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path={routes.login} component={LoginPage} />
					<Route exact path={routes.logout} component={LogoutPage} />

					<Route exact path={routes.index}>
						<Redirect to={routes.todo.index} />
					</Route>

					<Route exact path={routes.todo.index} component={TodoPage} />
					<Route component={NotFoundPage} />
				</Switch>
			</BrowserRouter>
		</main>
	);
}

export default App;
