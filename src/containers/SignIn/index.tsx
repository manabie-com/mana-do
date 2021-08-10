import React from 'react'
import { useForm, Controller } from "react-hook-form"
import { connect } from 'react-redux'
import { LOGIN } from 'src/redux/reducers/auth'
import { AuthForm } from 'src/redux/types'
import { SignInProps } from 'src/types/SignIn'

const SignInComponent = React.memo((props: SignInProps) => {
    const { handleSubmit, control } = useForm(),
        { dispatch } = props

    const onSubmit = (data: AuthForm) => {
        dispatch({
            type: LOGIN,
            data
        })
    }

    return (
        <div className="container SignIn__form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="userId" className="input-sizer">
                    <span>User id</span>
                    <Controller
                        name="userId"
                        defaultValue=""
                        control={control}
                        rules={{
                            required: true
                        }}
                        render={({ field }) => (
                            <input
                                {...field}
                                id="userId"
                                style={{ marginTop: 12 }}
                            />
                        )}
                    />
                </label>
                <br />
                <label htmlFor="password" className="input-sizer">
                    <span>Password</span>
                    <Controller
                        name="password"
                        defaultValue=""
                        control={control}
                        rules={{
                            required: true
                        }}
                        render={({ field }) => (
                            <input
                                {...field}
                                id="password"
                                type="password"
                                style={{ marginTop: 12 }}
                            />
                        )}
                    />

                </label>
                <br />
                <button type="submit" style={{ marginTop: 12 }}>
                    Sign in
                </button>
            </form>
        </div>
    )
})

export default connect()(SignInComponent)