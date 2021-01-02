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
