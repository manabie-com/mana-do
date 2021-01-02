import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { LocalConstants } from "../../../constants/local"
import { ROUTE_PATHS } from "../../../constants/url-config"
import Service from "../../../service"

const SignInPage = () => {
	const [formValue, setForm] = useState({
		userId: "",
		password: "",
	})
	const [signInErr, setSignInErrr] = useState("")
	const [showError, setShowError] = useState([
		{
			name: "userId",
			isNullValue: false,
		},
		{
			name: "password",
			isNullValue: false,
		},
	])

	const history = useHistory()

	const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setSignInErrr("")

		if (!formValue.userId || !formValue.password) {
			let curentErrorSignIn = [...showError]
			if (!formValue.userId) curentErrorSignIn[0].isNullValue = true
			if (!formValue.password) curentErrorSignIn[1].isNullValue = true

			setShowError(curentErrorSignIn)

			return
		}

		await Service.signIn(formValue.userId, formValue.password)
			.then((res) => {
				localStorage.setItem(LocalConstants.Token, res)
				history.push(ROUTE_PATHS.TodoPage)
			})
			.catch((err) => {
				setSignInErrr(err)
				return
			})
	}

	const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.persist()

		let curentErrorSignIn = [...showError]
		curentErrorSignIn.forEach((p) => {
			if (p.name === e.target.name) {
				p.isNullValue = false
			}
		})

		setShowError(curentErrorSignIn)

		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const checkError = (name: "userId" | "password") => {
		return showError.some((e) => e.name === name && e.isNullValue)
	}

	return (
		<div id="sign_In">
			<div className="backdrop"></div>
			<div className="content">
				<form onSubmit={signIn}>
					<div className="backdrop-content"></div>
					<div>
						<div className="box-input">
							<label htmlFor="user_id">User id</label>

							<div>
								<input
									data-testid="user_id"
									id="user_id"
									name="userId"
									value={formValue.userId}
									onChange={onChangeField}
									placeholder="Enter your user name."
								/>
								{checkError("userId") && (
									<div className="error">Pleases enter user name!</div>
								)}
							</div>
						</div>
						<br />
						<div className="box-input">
							<label htmlFor="password">Password</label>
							<div>
								<input
									data-testid="password"
									id="password"
									name="password"
									type="password"
									value={formValue.password}
									onChange={onChangeField}
									placeholder="Enter your password."
								/>
								{checkError("password") && (
									<div className="error">Pleases enter password!</div>
								)}
								{signInErr && <div className="error">{signInErr}</div>}
							</div>
						</div>
						<br />

						<button type="submit">Sign in</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default SignInPage
