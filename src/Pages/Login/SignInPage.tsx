import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom'
import ButtonChangeLang from '../../component/ButtonChangeLang/ButtonChangeLang';
import Notification from '../../component/Notification/Notification';
import Service from '../../service'



const SignInPage = () => {
    const { t } = useTranslation()
    const [form, setForm] = useState({
        userId: '',
        password: '',
    });
    const [message, setMessage] = useState({
        userId: '',
        password: '',
    });
    const [noti, setNoti] = useState({
        status: false,
        type: 'alert',
        content: ''
    })
    const [showPass, setShowPass] = useState(false)
    const history = useHistory();

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            // validation when user let input empty and press sign in, show message 
            if (!form.userId) {
                setMessage((prev: any) => ({
                    ...prev,
                    userId: "user-must-not-empty"
                }))
            }
            if (!form.password) {
                setMessage((prev: any) => ({
                    ...prev,
                    password: "password-must-not-empty"
                }))
            }
            if (!form.userId || !form.password) return;
            ////////
            await Service.signIn(form.userId, form.password)
                .then((resp: any) => {
                    // loginTime: 1628998615576
                    // token: "testabc.xyz.ahk"
                    // username: "firstUser"
                    localStorage.setItem('token', resp.token)
                    localStorage.setItem('loginTime', resp.loginTime)
                    localStorage.setItem('username', resp.username)
                    history.push('/todo')
                })
                .catch((error: any) => {
                    setNoti((prev: any) => ({
                        ...prev,
                        status: true,
                        type: 'alert',
                        content: error
                    }))
                    setTimeout(() => {
                        setNoti((prev: any) => ({
                            ...prev,
                            status: false,
                            type: 'alert',
                            content: ''
                        }))
                    }, 3000)
                    //push notification
                })
        } catch (error) { // catch error when login fail
            // console.log('catch error here')
        }
    }
    const changStatusPassword = () => {
        setShowPass((prev: boolean) => (!prev))
    }
    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        const field = e.target.name || '';
        const value = e.target.value || '';
        // hide message when user enter content at client side ;
        if (field === "userId" && value && message.userId) {
            setMessage((prev: any) => ({
                ...prev,
                userId: ""
            }))
        }
        if (field === "password" && value && message.password) {
            setMessage((prev: any) => ({
                ...prev,
                password: ""
            }))
        }
        setForm((prev: any) => ({
            ...prev,
            [field]: e.target.value
        }))
    }

    return (
        <>
            <Notification
                noti={noti}
            />
            <ButtonChangeLang />
            <div className="ma-sign-in-page-wrapper">
                <div className="sign-in-logo">
                    <img alt="mana-do" src="/img/LoginScreen/logo.svg" />
                    <div className="ma-header-sub"> TO-DO LIST</div>
                </div>
                <form className="ma-login-form" onSubmit={signIn}>
                    <label htmlFor="user_id">
                        <input
                            className={
                                message.userId // focus when have error
                                    ? "ma-input ma-text ma-user-id ma-input-error"
                                    : "ma-input ma-text ma-user-id"
                            } // change id => class for use common class and easy to overide
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            name="userId"
                            value={form.userId}
                            onChange={onChangeField}
                            placeholder={t("user_name")}
                        />
                    </label>
                    <div className="ma-message ma-login-error ma-text">
                        {
                            message.userId
                                ? <>
                                    <img alt="mana-do" src="/img/LoginScreen/error.svg" />
                                    <div>
                                        {t(message.userId)}
                                    </div>
                                </>
                                : ""
                        }
                    </div>
                    <label className="ma-password-label" htmlFor="password" >
                        <input
                            className={
                                message.password // focus when have error
                                    ? "ma-input ma-text ma-password ma-input-error"
                                    : "ma-input ma-text ma-password"
                            }
                            // change id => class for use common class and easy to overide
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            name="password"
                            type={showPass ? "text" : "password"}
                            value={form.password}
                            onChange={onChangeField}
                            placeholder={t("password")}
                        />
                        {showPass ? <img alt="mana-do" onClick={() => changStatusPassword()} src="/img/LoginScreen/closeEye.svg" /> : <img alt="mana-do" onClick={() => changStatusPassword()} src="/img/LoginScreen/openEye.svg" />}
                    </label>
                    <div className="ma-message ma-login-error ma-text">
                        {
                            message.password
                                ? <>
                                    <img alt="mana-do" src="/img/LoginScreen/error.svg" />
                                    <div>
                                        {t(message.password)}
                                    </div>
                                </>
                                : ""
                        }
                    </div>
                    <button type="submit" className="ma-button ma-login-button ma-bg-main-color ma-text-Medium" >
                        {t("sign_in")}
                    </button>
                </form>
                <div className="ma-pic"></div>
            </div>
        </>);
};

export default SignInPage;