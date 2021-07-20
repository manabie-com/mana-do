import React, { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
import Service from '../../service'
import AppButton from '../../commons/AppButton';
import AppInput from '../../commons/AppInput';
import { actLogin } from '../../store/actions';
import { AppContext } from '../../store/context';
import AppFooter from '../../components/AppFooter';
import AppAlert from '../../commons/AppAlert';
import { useNotAuthenticated } from '../../hooks/useNotAuthenticated';

const SignInPage = () => {
    useNotAuthenticated();
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });
    const { dispatch } = useContext(AppContext);
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [alertMsg, setAlert] = useState({
        visible: false,
        title: '',
        content: '',
        type: ''
    } as {[x:string]:any});

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await Service.signIn(form.userId, form.password);
            if (response.status === 200) {
                dispatch(actLogin(response.data));
                setLoading(false)
                history.push('/todo');
            } 
        } catch (error) {
            setAlert({
                visible:true,
                type: 'error',
                title: 'Error',
                content: 'Authentication failed',   //THIENNGUYEN: replace error.message by a friendly message
            })
            setLoading(false)
        }
        
    }

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    

    return (
        <main className="login">
            <div className="ToDo__container">
                <div style={{margin: "auto 32px"}}>
                    <div style={{ textAlign: "center" }}>
                        <img alt="React logo" src='logo192.png' style={{ width: 100 }}></img>
                        <h4>Please sign in to continue</h4>
                        {
                            alertMsg.visible && <AppAlert alertType={alertMsg.type} content={alertMsg.content}></AppAlert>
                        }
                    </div>
                    <form onSubmit={signIn}>
                            <AppInput
                                id="user_id"
                                name="userId"
                                value={form.userId}
                                style={{ marginTop: 12 }}
                                onChange={onChangeField}
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
                                value={form.password}
                                onChange={onChangeField}
                                required
                                label="Password"
                            ></AppInput>
                        <br />
                        <AppButton isLoading={loading} style={{ minWidth: "100%" }} btnType="primary" type="submit">Sign in</AppButton>
                        <div style={{textAlign: "center"}}>
                        <span>Not a member? </span><Link to="/register" >Register an acoount</Link>
                        </div>
                        <AppFooter textColor="theme" />
                    </form>
                </div>
            </div>
        </main>
    );
};

export default SignInPage;