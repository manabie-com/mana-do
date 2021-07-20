import React, { useContext, useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
import Service from '../../service'
import AppButton from '../../commons/AppButton';
import AppInput from '../../commons/AppInput';
import AppAlert from '../../commons/AppAlert';
import { actLogin } from '../../store/actions';
import { AppContext } from '../../store/context';
import { helpers } from '../../helpers';
import { User } from '../../models/user';
import { MSG_ACCOUNT_CREATED, MSG_ACCOUNT_EXISTS } from '../../components/constants';
import AppFooter from '../../components/AppFooter';

const RegisterPage = () => {
    const [form, setForm] = useState({
        username: {
            value: '',
            error: '',
        },
        password: {
            value: '',
            error: ''
        },
        password_confirm: {
            value: '',
            error: ''
        },
        firstname: {
            value: '',
            error: '',
        },
        lastname: {
            value: '',
            error: '',
        }
    } as { [key: string]: any });

    const { dispatch } = useContext(AppContext);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const isEnterData = useRef(false);
    
    const [alertMsg, setAlert] = useState({
        visible: false,
        title: '',
        content: '',
        type: ''
    } as {[x:string]:any});


    const register = async () => {
        setLoading(true);
        try {
            var user = {
                firstName: form.firstname.value,
                lastName: form.lastname.value,
                password: form.password.value,
                username: form.username.value,
                user_id: '',
            } as User;
            const response = await Service.register(user);
            setLoading(false);
            if (response.status === 200 && response.message === MSG_ACCOUNT_CREATED) {
                dispatch(actLogin(response.data));
                history.push('/todo');
            } 
            if (response.status === 200 && response.message === MSG_ACCOUNT_EXISTS) {
                setAlert({
                    visible:true,
                    type: 'warning',
                    title: 'Warning',
                    content: 'Account has already exists',   //THIENNGUYEN: replace error.message by a friendly message
                })
            }
        } catch (error) {
            setAlert({
                visible:true,
                type: 'error',
                title: 'Error',
                content: 'Unknown Error',   //THIENNGUYEN: replace error.message by a friendly message
            })
            setLoading(false);
        }
    }

    const checkAllFieldsValid = (data: any) => {
        if (isEnterData.current === false) return false;
        let isAllValid = Object.keys(data).every(key => {
            const obj = data[key];
            return obj.error === ""
        });
        return isAllValid;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isEnterData.current === false) {
            Object.keys(form).forEach(key => {
                setForm((prevData) => ({
                    ...prevData,
                    [key]: {
                        value: prevData[key].value,
                        error: helpers.validate(key, prevData[key].value, prevData['password'].value)
                    }
                }))
            }
            )
        }
        if (checkAllFieldsValid(form)) {
            register();
        }

    }


    function handleOnChange(key: string) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            isEnterData.current = true;
            const value = e.target.value;
            setForm({
                ...form,
                [key]: {
                    value,
                    error: helpers.validate(key, value, form.password.value)
                }
            })
        }
    }

    return (
        <main className="login">
            <div className="ToDo__container">
                <div style={{ margin: "auto 32px" }}>
                    <div style={{ textAlign: "center" }}>
                        <img alt="React logo" src='logo192.png' style={{ width: 100 }}></img>
                        <h4>Please complete the form to register and enjoy</h4>
                        {
                            alertMsg.visible && <AppAlert alertType={alertMsg.type} content={alertMsg.content}></AppAlert>
                        }
                    </div>
                    <form onSubmit={handleSubmit}>
                        <AppInput
                            id="firstname"
                            name="firstname"
                            value={form.firstname.value}
                            errorText={form.firstname.error}
                            style={{ marginTop: 12 }}
                            onChange={handleOnChange('firstname')}
                            placeholder="Please enter your first name..."
                            label="First name"
                            required
                        />
                        <br />
                        <AppInput
                            id="lastname"
                            name="lastname"
                            value={form.lastname.value}
                            errorText={form.lastname.error}
                            style={{ marginTop: 12 }}
                            onChange={handleOnChange('lastname')}
                            placeholder="Please enter your last name..."
                            label="Last name"
                            required
                        />
                        <br />
                        <AppInput
                            id="user_id"
                            name="userId"
                            value={form.username.value}
                            errorText={form.username.error}
                            style={{ marginTop: 12 }}
                            onChange={handleOnChange('username')}
                            placeholder="Please enter your username..."
                            label="Username"
                            required
                        />
                        <br />
                        <AppInput
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Please enter your password"
                            style={{ marginTop: 12 }}
                            value={form.password.value}
                            errorText={form.password.error}
                            onChange={handleOnChange('password')}
                            required
                            label="Password"
                        ></AppInput>
                        <br />
                        <AppInput
                            id="password_confirm"
                            name="password_confirm"
                            type="password"
                            placeholder="Please enter your password"
                            style={{ marginTop: 12 }}
                            value={form.password_confirm.value}
                            onChange={handleOnChange('password_confirm')}
                            errorText={form.password_confirm.error}
                            label="Confirm your password"
                            required
                        ></AppInput>
                        <br />
                        <AppButton isLoading={loading} style={{ minWidth: "100%" }} btnType="primary" type="submit">Register</AppButton>
                        <div style={{textAlign: "center"}}>
                        <span>Already have an account? </span><Link to="/" >Sign in</Link>
                        <AppFooter textColor="theme" />
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default RegisterPage;