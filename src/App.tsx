import React from "react"
import { BrowserRouter, Switch, Redirect } from "react-router-dom"
import SignInPage from "./components/pages/sign-in/SignInPage"
import ToDoPage from "./components/pages/todo/ToDoPage"
import "./App.css"
import { ROUTE_PATHS } from "./constants/url-config"
import RouteLayout from "./components/providers/RouteLayout"
import { isSignIn } from "./utils"

export interface Route {
	href: string
	exact: boolean
	component: React.ReactNode
	title: string
	loginRequired: boolean
}

function App() {
	const routes: Route[] = [
		{
			href: ROUTE_PATHS.SignIn,
			exact: true,
			component: SignInPage,
			title: "Sign In",
			loginRequired: false,
		},
		{
			href: ROUTE_PATHS.TodoPage,
			exact: true,
			component: ToDoPage,
			title: "Todo",
			loginRequired: true,
		},
	]

	return (
		<main className="App">
			<BrowserRouter>
				<Switch>
					{routes.map(({ href, exact, component, title, loginRequired }) => (
						<RouteLayout
							key={href}
							path={href}
							exact={exact}
							component={component}
							title={title}
							loginRequired={loginRequired}
						/>
					))}

					<Redirect
						to={isSignIn() ? ROUTE_PATHS.TodoPage : ROUTE_PATHS.SignIn}
					/>
				</Switch>
			</BrowserRouter>
		</main>
	)
}

export default App
