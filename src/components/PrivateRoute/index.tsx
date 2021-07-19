import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { RouteComponentProps } from "react-router-dom"
import SignInService from '../../service/sign-in'

interface routeSettings {
    path: string,
    component: (props: RouteComponentProps) => JSX.Element
}

const PrivateRoute = (props: routeSettings): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isAuth, setIsAuth] = useState<boolean>(false)

    const onAuthenticating = async () => {
        const token = localStorage.getItem('token')
        let res = await SignInService.verifyToken(token || "")
        res.statusCode == 200 ? setIsAuth(true) : setIsAuth(false)
        setIsLoading(false)
    }

    useEffect(() => {
        onAuthenticating()
    }, [])



    return (
        <>
            {isLoading ? (
                <div>...loading</div>
            ) : isAuth ? (

                <Route
                    //key={props.key}
                    path={props.path}
                    render={(routeProps) => <props.component {...routeProps} />}
                />
            ) : (   
                <Redirect from={props.path} to="/" />
            )}
        </>
    )
}

export default PrivateRoute