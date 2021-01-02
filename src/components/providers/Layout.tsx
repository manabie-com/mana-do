import React from "react"
import { useHistory } from "react-router-dom"
import { ROUTE_PATHS } from "../../constants/url-config"

const Layout = ({ children }: any) => {
	const history = useHistory()

	return (
		<div id="layout">
			<header className="header">
				<div></div>
				<button
					className="btn-sign-out"
					onClick={() => {
						localStorage.clear()
						history.push(ROUTE_PATHS.SignIn)
					}}
				>
					Sign out
				</button>
			</header>

			<div className="content">{children}</div>
		</div>
	)
}

export default Layout
