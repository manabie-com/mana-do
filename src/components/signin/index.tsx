import React, { useCallback, useReducer } from 'react';
import { useHistory } from 'react-router-dom'
import signInModel, { SigninFieldName } from 'root/models/signin'

import signinReducer, { initialState } from 'root/store/reducers/signin.reducer'
import Service from 'root/service'
import SigninPresentation from './presentation';

const SignInComponent = () => {
	const [signinData, dispatch] = useReducer(signinReducer, initialState);
	const history = useHistory();

	const handleUpdateField = useCallback((name: SigninFieldName, value) => {
		const { actionUpdate } = signInModel[name]
		dispatch(actionUpdate({ value }))
	}, [dispatch])

	const handleLogin = useCallback(async () => {
		try {
			const res = await Service.signIn(signinData.userId.value, signinData.password.value)
			localStorage.setItem('token', res)
			history.push('/todo')
		} catch (error) {

		}
	}, [history, signinData])

	return (
		<SigninPresentation
			signin={handleLogin}
			onChangeField={handleUpdateField}
			form={signinData}
			model={signInModel}
		/>
	);
};

export default SignInComponent;