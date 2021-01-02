import React, { useEffect } from "react"
import { Redirect, Route, useHistory } from "react-router-dom"
import { ROUTE_PATHS } from "../../constants/url-config"
import { isSignIn } from "../../utils"
import Layout from "./Layout"

const RouteLayout: React.FC<any> = ({ component: Component, ...rest }) => {
	const history = useHistory()

	const isLogin = isSignIn()
	let isLoginRequired = rest.loginRequired

	useEffect(() => {
		document.title = rest.title
	}, [])

	// check if not login when redirect to sign in
	if (isLoginRequired && !isLogin) history.push(ROUTE_PATHS.SignIn)
	// if logged in but redirects to the login page, redirect to the todo page (home page)
	if (isLogin && !isLoginRequired) history.push(ROUTE_PATHS.TodoPage)

	return (
		<Route
			{...rest}
			render={(props) =>
				isLogin && !isLoginRequired ? (
					<Redirect to={{ pathname: ROUTE_PATHS.TodoPage }} />
				) : !isLogin && isLoginRequired ? (
					<Redirect to={{ pathname: ROUTE_PATHS.SignIn }} />
				) : isLogin && isLoginRequired ? (
					<Layout>
						<Component {...props}></Component>
					</Layout>
				) : (
					<Component {...props}></Component>
				)
			}
		/>
	)
}

export default RouteLayout
