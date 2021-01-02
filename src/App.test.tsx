import React from "react"
import { render } from "@testing-library/react"
import App from "./App"

// test("renders learn react link", () => {
// 	const { getByText } = render(<App />)
// 	const linkElement = getByText(ROUTE_PATHS.SignIn)
// 	//expect(linkElement).toBeInTheDocument()
// })

describe("App", () => {
	afterAll(() => {
		localStorage.clear()
	})

	it("when there is no token then on the sign in page", () => {
		const { getByRole, getByTestId } = render(<App />)
		const signInButton = getByRole("button")

		expect(signInButton).toBeInTheDocument()
		expect(getByTestId("user_id")).toHaveTextContent("")
		expect(getByTestId("password")).toHaveTextContent("")
	})

	it("when there is token then on the todos page", () => {
		localStorage.setItem("token", "testabc.xyz.ahk")
		const { getByTestId } = render(<App />)

		expect(getByTestId("btnShowAll")).toBeInTheDocument()
		expect(getByTestId("btnShowActive")).toBeInTheDocument()
		expect(getByTestId("btnShowComplete")).toBeInTheDocument()
		expect(getByTestId("btnClearAll")).toBeInTheDocument()
	})
})
